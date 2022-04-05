import { ConfigModule } from "@nestjs/config";
import { readFileSync } from "fs";
import * as yaml from "js-yaml"

export const configModule = ConfigModule.forRoot({
    isGlobal: true,
    cache: true,
    load: [configuration],
})

export function configuration (): Record<string, any> {
    const config = yaml.load(readFileSync(`${process.cwd}/config.yaml`, 'utf8'),
    ) as Record<string, any>;
    return config;
}
