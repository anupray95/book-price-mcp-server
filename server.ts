import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import { z } from "zod";

const server = new McpServer({
    name: 'book-price-fetcher',
    version: '1.0.0',
});

async function getPriceOfBookByName(bookName: string) {
    return `${bookName.length * 100} rupees`;
}

server.tool(
    // tool name
    'getPriceOfBookByName',
    // tool description
    'Get price of the book by name',
    // tool parameters
    {
        bookName: z.string().describe('price of the book in rupees')
    },
    // define an async function that will run when the tool is called
    async ({ bookName }) => {
        // TODO: Implement the tool logic
        const price = await getPriceOfBookByName(bookName);
        return {
            content: [
                {
                    type: 'text',
                    text: JSON.stringify(price),
                }
            ]
        }
    }

);

server.resource(
    // resource name
    'price://books',
    // resource description
     'This will provide price of books by name' ,
     // resource content type
     'text/plain',
    // define an async function that will run when the resource is called
    async () => "Return Price of books for bookName"
)

async function init() {
    const transport = new StdioServerTransport();
    await server.connect(transport);
    console.error('book price mcp started ');
}

init().catch(err => { console.error(err); });