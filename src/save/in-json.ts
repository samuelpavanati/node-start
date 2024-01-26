import fs from 'node:fs'

interface Variables {
  path: string
}

export class InJSON implements Variables {
	constructor(public path: string) {
		this.path = path
	}

	read() {
		const returnData = fs.readFile(this.path, 'utf-8', (err, data) => {
			if (err) {
				console.log('Error! Cannot read the JSON file!')

				return
			}
      
			try {
				// const getData = JSON.parse(data)
        
				// console.log('Data read from JSON file: ', getData) 

				// dataArray.push(getData)

				const dataArray = []

				dataArray.push(JSON.parse(data))

				console.log('Data read from JSON file: ', dataArray)

				return dataArray

			} catch (err) {
				console.error('Error parsing JSON: ', err)
			}
		})

		console.log(returnData)

		return returnData
	}

	// write(data: JSON) {
	write() {
		const previousData = this.read()

		console.log('print previous data', previousData)

		// let currentData: JSON[]

		// currentData.push(previousData)
    
		// currentData.push(data)

		// const saveUserToJSON = JSON.stringify(currentData, null, 2)

		// const saveFile = './user-data.json'

		// // save to file
		// await fs.writeFile(saveFile, saveUserToJSON)
	}

	toString(){

	}
}