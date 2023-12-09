export interface Tool {
    init: () => void;
    update: () => void;
    dispose: () => void;
}

interface IEquipment {
    tools: Set<Tool & {initalized: boolean}>;
    registerTools: (tool: Tool) => void;
    initializeTools: () => void;
    updateTools: () => void;
    disposeTools: () => void;
}

export class Equipment implements IEquipment{
    tools: Set<Tool & {initalized: boolean}>;
    constructor(){
        this.tools = new Set<Tool & {initalized: boolean}>();
    }
    registerTools(tool: Tool): void {
        this.tools.add({...tool, initalized: false});
    };
    initializeTools():void{
        this.tools.forEach((tool) => {
            tool.init();
            tool.initalized = true;
        });
    }
    updateTools():void {
        this.tools.forEach((tool) => {
           if(!tool.initalized) throw new Error('Cannot update any tools before initialization.');
           tool.update();
        });
    };
    disposeTools():void {
        this.tools.forEach((tool) => {
            tool.dispose();
        });
    }
}
