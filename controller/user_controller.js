import { getUrlByCode, incrementClickCount, insertUrl } from "../model/url_model.js";
import { nanoid } from 'nanoid';
import validUrl from 'valid-url';

export const createShortUrl = async (req, res) => {
    const  {long_url} = req.body;
    console.log('Received long URL:', req.body);
    

    if (!validUrl.isUri(long_url)) {
        return res.status(400).json({ error: 'Invalid URL format' });
    }

    const short_code = nanoid(6);
    try {
        if (!long_url) {
            return res.status(400).json({ error: 'Long URL is required' });
        }
        
        await insertUrl(long_url, short_code);
        return res.status(201).json({ short_url: `${req.protocol}://${req.get('host')}/${short_code}` });

    } catch (error) {
        console.log('Error creating short URL:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

export const redirectToLongUrl = async (req, res) => {
    const { short_code } = req.params;
    try {
        const urlData = await getUrlByCode(short_code);
        if (!urlData) {
            return res.status(404).json({ error: 'Short URL not found' });
        }

        await incrementClickCount(short_code);
        return res.redirect(urlData.long_url);

    } catch (error) {
        console.log('Error redirecting to long URL:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}