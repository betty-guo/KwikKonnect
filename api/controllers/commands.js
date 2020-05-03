import express from 'express'
import { postLink } from '../services/slack'

const router = new express.Router()

router.post('/commands', async (req, res) => {
    let status = 200
    await postLink('C012YGSHMFD', "Hello")
        .catch(() => {
            status = 503
        })
    res.status(status).send('Slash command completed.')
})

export default router
