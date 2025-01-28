interface Step {    
}

interface SystemPromptStep extends Step {   
    system_prompt: string;
}

interface ActionStep extends Step { 
    step: number;
    name: string;
    llm_output: string;
    observations: string;
}

interface PlanningStep extends Step {
    name: string;
    description: string;
    execute(args: string): Promise<string>;
}

export { ActionStep, PlanningStep, Step, SystemPromptStep };