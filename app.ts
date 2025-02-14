import { mkdir, rm } from 'node:fs/promises'
import { sleep } from 'bun'

const fileCount = 3
const folder = "files"
const useImportPathRemap = true // set to false to see bun work as intended

if (true) { // set to false to see bun successfully read files on subsequent runs.
    await rm(folder, {recursive : true, force: true})
    await sleep(2000) // visually see our directory be deleted.
}

await mkdir(folder, {recursive : true})
const importPrefix = useImportPathRemap ? '@' : '.'

for (let i = 0; i < fileCount; i++) { 
    const file = `file-${i+1}.ts`
    const filePath = `${folder}/${file}`

    await Bun.write(filePath, `console.log("calling from ${file}")`)
    await import(`${importPrefix}/${filePath}`)
}
