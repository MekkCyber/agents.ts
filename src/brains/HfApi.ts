import { HfInference } from "@huggingface/inference";

// Create an instance of HfInference
const hf = new HfInference("");

// Function to perform text generation
async function runLLMInference() {
  try {
    const response = await hf.textGeneration({
      model: "Qwen/Qwen2.5-72B-Instruct", // Replace with your desired model (e.g., "bigscience/bloom", "meta-llama/Llama-2-7b-chat-hf", etc.)
      inputs: "Once upon a time,",
      parameters: {
        max_new_tokens: 50, // Limit the number of tokens in the output
        temperature: 0.7, // Adjust creativity
      },
    });

    console.log("Generated Text:", response.generated_text);
  } catch (error) {
    console.error("Error during inference:", error);
  }
}

// Run the function
runLLMInference();