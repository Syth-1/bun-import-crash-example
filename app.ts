import { mkdir, rm } from 'node:fs/promises'
import { sleep } from 'bun'

const fileCount = 3
const folder = "files/"

if (true) { // set to false to see bun successfully read files on subsequent runs.
    await rm(folder, {recursive : true})
    await sleep(2000) // visually see our directory be deleted.
}

await mkdir(folder, {recursive : true})

for (let i = 0; i < fileCount; i++) { 
    const file = `file-${i+1}.ts`
    await Bun.write(folder + file, `console.log("calling from ${file}")`)

    await import(`@/${folder}${file}`)
}
