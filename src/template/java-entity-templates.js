export const entityTemplate = `
package {{packagePath}};

public class {{className}} {
  
  {{#each variables}}
  private {{this.type}} {{this.name}};
  {{/each}}


  // empty constructor
  public {{className}}() {}
  // constructor
  public {{className}}({{#each variables}}{{this.type}} {{this.name}}{{#unless @last}}, {{/unless}}{{/each}}) {
    {{#each variables}}
    this.{{this.name}} = {{this.name}};
    {{/each}}
  }
  
  // getter/setter
  {{#each variables}}
  public {{this.type}} get{{capitalize this.name}}() {
    return {{this.name}};
  }
  public void set{{capitalize this.name}}({{this.type}} viewId) {
    this.{{this.name}} = {{this.name}};
  }
  
  {{/each}}
}
`.trimStart()