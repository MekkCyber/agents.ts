import { SYSTEM_PROMPT_REACT } from '../utils/prompts';
import { ActionStep, Step, SystemPromptStep } from '../types/step';
import Tool from '../types/tool';

function get_tools_names_and_descriptions(tools: Tool[]): [string, string] {
  let tools_names = '';
  let tools_descriptions = '';

  tools.forEach((tool) => {
    tools_names += `${tool.name}, `;
    tools_descriptions += `${tool.name}: ${tool.description}, `;
  });

  tools_names = tools_names.slice(0, -2);
  tools_descriptions = tools_descriptions.slice(0, -2);

  return [tools_names, tools_descriptions];
}

abstract class Agent {
  name: string;
  memory: Step[];
  state: {[key: string] : string}
  system_prompt: string;
  tools: Tool[];
  max_iterations: number;
  model: string

  constructor(name: string, system_prompt: string = "", tools: Tool[] = [], max_iterations: number = 5, model: string = "") {
    this.name = name;
    this.memory = [];
    this.state = {};
    this.system_prompt = system_prompt ? system_prompt : SYSTEM_PROMPT_REACT;
    this.tools = tools;
    this.max_iterations = max_iterations;
    this.model = model;
  }

  add_to_memory(entry: Step): void {
    this.memory.push(entry);
  }


  abstract react(steps: Step[]): Promise<string>;

  initialize_system_prompt(): void {
    const [tools_names, tools_descriptions] = get_tools_names_and_descriptions(this.tools);
    this.system_prompt = this.system_prompt.replace("{tools_names}", tools_names);
    this.system_prompt = this.system_prompt.replace("{tools_descriptions}", tools_descriptions);
  }

  async run(iterations: number = 5): Promise<void> {
    console.log(`Running agent: ${this.name}`);
    this.initialize_system_prompt();  
    const system_prompt_step: SystemPromptStep = { system_prompt: this.system_prompt }
    this.add_to_memory(system_prompt_step);

    let result = '';
    let count = 0;
    let final_result = null;
    while (count < iterations && !final_result) {
      console.log(`Iteration ${count + 1}:`);
      const step: ActionStep = { step: count + 1, name: this.name, llm_output: '', observations: '' };
      try {
        // Call the step method, which is defined in the subclass (like ToolUseAgent)
        result = await this.react(this.memory);   
        console.log(`Result: ${result}`);

        // Here you can add logic to decide if you should stop or continue to the next iteration
        // For example, if the result meets a certain condition, you can break the loop early
      } catch (error) {
        console.error('Error during execution:', error);
      }

      // count++;
    }

    console.log(`${this.name} completed with final result: ${result}`);
  }

  get_memory_from_steps(steps: Step[]): string {
    return 'Needs to be implemented';
  }
}

export default Agent;


