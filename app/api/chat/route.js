import { NextResponse } from 'next/server';
import fetch from 'node-fetch';

export async function POST(req) {
    const data = await req.json();

    // Extract the symbol from the request data (e.g., 'btcusd')
    const symbol = data.symbol ? data.symbol.toUpperCase() : null;

    if (!symbol) {
        return NextResponse.json({ message: 'Please provide a valid cryptocurrency symbol (e.g., btcusd).' });
    }

    // Gemini API endpoint for retrieving market data
    const url = `https://api.gemini.com/v1/pubticker/${symbol}`;

    try {
        const response = await fetch(url, {
            headers: {
                'X-GEMINI-APIKEY': process.env.GEMINI_API_KEY,
            },
        });

        if (!response.ok) {
            throw new Error('Failed to fetch data from Gemini API');
        }

        const geminiData = await response.json();

        // Prepare the response message based on the fetched data
        const responseMessage = `The current price of ${symbol} is ${geminiData.last}, with a bid of ${geminiData.bid} and an ask of ${geminiData.ask}.`;

        // Return the response as a JSON object
        return NextResponse.json({ message: responseMessage });

    } catch (error) {
        console.error('Error fetching data from Gemini API:', error);
        return NextResponse.json({ message: 'An error occurred while fetching data. Please try again later.' });
    }
}
