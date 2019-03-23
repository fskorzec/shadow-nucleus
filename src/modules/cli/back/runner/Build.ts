export class Build {
  public static buildModule(modulePath: string, target: "back" | "front"): void {
    console.log(`Compiling ${modulePath} targeting ${target}`);

    console.log(`Packaging module`);

    console.log(`Deploying module`);

    console.log(`Done!`);
  }
}