import Tool from "../types/tool";
import Agent from "./base";
import { SYSTEM_PROMPT_REACT, SYSTEM_PROMPT_TOOL_USE } from "../utils/prompts";
import { ActionStep, Step, SystemPromptStep } from "../types/step"; // Adjust the import path as necessary

class ToolUseAgent extends Agent {

  constructor(name: string, system_prompt: string = "", tools: Tool[] = [], max_iterations: number = 5, model: string = "") {
    if (system_prompt === "") {
      system_prompt = SYSTEM_PROMPT_TOOL_USE;
    }
    super(name, system_prompt, tools, max_iterations, model);
  }

  register_tool(tool: Tool): void {
    this.tools.set(tool.name, tool);
  }

  async react(action_step: ActionStep): Promise<string> {

    const memory = this.get_memory_from_steps(this.memory)
    const match = memory.match(/use (.+?) with args (.+)/);
    

    return "I don't know how to handle that input.";
  }
}


export default ToolUseAgent;