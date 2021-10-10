import express from 'express'

import authenticateRequest from './middlewares/authenticateRequest'
import { postStoreImage } from './services/datasetFeedback'
import { postAnalyzeFood } from './services/foodRecipeCalorie'

const app = express()
const PORT = process.env.PORT ?? 8080

app.use(express.json({ limit: '2mb' }))
app.use(authenticateRequest)

app.post('/api/v1/dataset-feedback/store-image', postStoreImage)
app.post('/api/v1/food-recipe-calorie/analyze-food', postAnalyzeFood)

app.listen(PORT, () => {
  console.log(`[server]: Server is running at https://localhost:${PORT}`)
})
