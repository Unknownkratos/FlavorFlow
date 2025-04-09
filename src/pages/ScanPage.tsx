import type React from "react"
import "../styles/ScanPage.css"
import { Camera, Upload, ImageIcon, RefreshCw, ChevronRight } from "lucide-react"
import Footer from "../components/Footer"

const ScanPage: React.FC = () => {
  return (
    <div className="scan-page">
      <div className="scan-hero">
        <div className="scan-hero-content">
          <h1 className="scan-title">Scan Your Ingredients</h1>
          <p className="scan-subtitle">
            Take a photo of your ingredients or upload an image to discover delicious recipes you can make right now.
          </p>
        </div>
      </div>

      <div className="scan-container">
        <div className="scan-options">
          <div className="scan-option-card active">
            <div className="option-icon">
              <Camera size={24} />
            </div>
            <h3 className="option-title">Take a Photo</h3>
            <p className="option-description">Use your camera to snap a picture of your ingredients</p>
          </div>

          <div className="scan-option-card">
            <div className="option-icon">
              <Upload size={24} />
            </div>
            <h3 className="option-title">Upload Image</h3>
            <p className="option-description">Select an image from your device gallery</p>
          </div>

          <div className="scan-option-card">
            <div className="option-icon">
              <ImageIcon size={24} />
            </div>
            <h3 className="option-title">Browse Gallery</h3>
            <p className="option-description">Choose from your previously scanned images</p>
          </div>
        </div>

        <div className="scan-interface">
          <div className="scan-preview">
            <div className="camera-placeholder">
              <Camera size={48} className="camera-icon" />
              <p>Point your camera at ingredients</p>
              <button className="camera-button">Take Photo</button>
            </div>
          </div>

          <div className="scan-instructions">
            <h3 className="instructions-title">How It Works</h3>
            <ol className="instructions-list">
              <li className="instruction-item">
                <span className="instruction-number">1</span>
                <div className="instruction-content">
                  <h4>Capture or Upload</h4>
                  <p>Take a clear photo of your ingredients or upload an existing image</p>
                </div>
              </li>
              <li className="instruction-item">
                <span className="instruction-number">2</span>
                <div className="instruction-content">
                  <h4>AI Recognition</h4>
                  <p>Our AI will identify the ingredients in your image</p>
                </div>
              </li>
              <li className="instruction-item">
                <span className="instruction-number">3</span>
                <div className="instruction-content">
                  <h4>Get Recipes</h4>
                  <p>Discover recipes you can make with those ingredients</p>
                </div>
              </li>
            </ol>

            <div className="scan-actions">
              <button className="action-button secondary">
                <RefreshCw size={16} />
                Reset
              </button>
              <button className="action-button primary">
                Find Recipes
                <ChevronRight size={16} />
              </button>
            </div>
          </div>
        </div>

        <div className="scan-examples">
          <h3 className="examples-title">Example Scans</h3>
          <div className="examples-grid">
            <div className="example-card">
              <div className="example-image">
                <img src="/placeholder.svg?height=200&width=200" alt="Vegetables" />
              </div>
              <div className="example-content">
                <h4>Fresh Vegetables</h4>
                <p>12 recipes found</p>
              </div>
            </div>
            <div className="example-card">
              <div className="example-image">
                <img src="/placeholder.svg?height=200&width=200" alt="Fruits" />
              </div>
              <div className="example-content">
                <h4>Mixed Fruits</h4>
                <p>8 recipes found</p>
              </div>
            </div>
            <div className="example-card">
              <div className="example-image">
                <img src="/placeholder.svg?height=200&width=200" alt="Pantry Items" />
              </div>
              <div className="example-content">
                <h4>Pantry Items</h4>
                <p>15 recipes found</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}

export default ScanPage
