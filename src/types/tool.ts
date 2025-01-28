interface Tool {
    name: string;
    description: string;
    execute(args: string): Promise<string>;
}

export default Tool;