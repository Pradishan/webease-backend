import Portfolio from "../models/Portfolio.js";

// Create a new portfolio card
export const createPortfolio = async (req, res) => {
  const { title, subtitle, description, coverImage } = req.body;

  try {
    const newPortfolio = new Portfolio({
      title,
      subtitle,
      description,
      coverImage,
    });

    const savedPortfolio = await newPortfolio.save();
    res.status(201).json(savedPortfolio);
  } catch (error) {
    res.status(500).json({ message: "Error creating portfolio", error });
  }
};

// Get all portfolio cards
export const getAllPortfolios = async (req, res) => {
  try {
    const portfolios = await Portfolio.find();
    res.status(200).json(portfolios);
  } catch (error) {
    res.status(500).json({ message: "Error fetching portfolios", error });
  }
};

// Get a single portfolio card by ID
export const getPortfolioById = async (req, res) => {
  const { id } = req.params;
  try {
    const portfolio = await Portfolio.findById(id);
    if (!portfolio) {
      return res.status(404).json({ message: "Portfolio not found" });
    }
    res.status(200).json(portfolio);
  } catch (error) {
    res.status(500).json({ message: "Error fetching portfolio", error });
  }
};

// Update a portfolio card by ID
export const updatePortfolio = async (req, res) => {
  const { id } = req.params;
  const { title, subtitle, description, coverImage } = req.body;

  try {
    const updatedPortfolio = await Portfolio.findByIdAndUpdate(
      id,
      { title, subtitle, description, coverImage },
      { new: true } // Return the updated document
    );

    if (!updatedPortfolio) {
      return res.status(404).json({ message: "Portfolio not found" });
    }

    res.status(200).json(updatedPortfolio);
  } catch (error) {
    res.status(500).json({ message: "Error updating portfolio", error });
  }
};

// Delete a portfolio card by ID
export const deletePortfolio = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedPortfolio = await Portfolio.findByIdAndDelete(id);

    if (!deletedPortfolio) {
      return res.status(404).json({ message: "Portfolio not found" });
    }

    res.status(200).json({ message: "Portfolio deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting portfolio", error });
  }
};
