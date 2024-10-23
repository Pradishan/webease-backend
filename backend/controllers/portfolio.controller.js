import asyncMiddleware from "../middlewares/asyncMiddleware.js";
import Portfolio from "../models/portfolio.model.js";

// Create a portfolio
const createPortfolio = asyncMiddleware(async (req, res) => {
  const { title, subtitle, description, coverImage, category } = req.body;
  const portfolio = await Portfolio.findOne({ title });

  if (portfolio) {
    res.status(400);
    throw new Error("Portfolio with this title already exists");
  }

  const newPortfolio = new Portfolio({
    title,
    subtitle,
    description,
    coverImage,
    category,
  });

  if (newPortfolio) {
    await newPortfolio.save();
    res.status(201).json(newPortfolio);
  } else {
    res.status(400);
    throw new Error("Portfolio not created");
  }
});

// Get a specific portfolio by ID
const getPortfolioById = asyncMiddleware(async (req, res) => {
  let _id = req.params.id;
  const portfolio = await Portfolio.findById(_id);

  if (!portfolio) {
    res.status(404);
    throw new Error("Portfolio not found");
  }

  res.status(200).json(portfolio);
});

// Get all portfolios
const getAllPortfolios = asyncMiddleware(async (req, res) => {
  const portfolios = await Portfolio.find({});

  if (portfolios.length === 0) {
    res.status(404);
    throw new Error("No portfolios found");
  }

  res.status(200).json(portfolios);
});

// Update a portfolio by ID
const updatePortfolio = asyncMiddleware(async (req, res) => {
  let _id = req.params.id;
  const portfolio = await Portfolio.findById(_id);

  if (portfolio) {
    portfolio.title = req.body.title || portfolio.title;
    portfolio.subtitle = req.body.subtitle || portfolio.subtitle;
    portfolio.description = req.body.description || portfolio.description;
    portfolio.coverImage = req.body.coverImage || portfolio.coverImage;
    portfolio.category = req.body.category || portfolio.category;

    const updatedPortfolio = await portfolio.save();
    res.json(updatedPortfolio);
  } else {
    res.status(404);
    throw new Error("Portfolio not found");
  }
});

// Delete a portfolio by ID
const deletePortfolio = asyncMiddleware(async (req, res) => {
  let _id = req.params.id;
  const portfolio = await Portfolio.findById(_id);

  if (portfolio) {
    await portfolio.deleteOne();
    res.json({ message: "Portfolio removed" });
  } else {
    res.status(404);
    throw new Error("Portfolio not found");
  }
});

export {
  createPortfolio,
  getPortfolioById,
  getAllPortfolios,
  updatePortfolio,
  deletePortfolio,
};
