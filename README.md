# Book Price MCP Server

A Model Context Protocol (MCP) server that provides book price information through a standardized interface. This server enables AI assistants and other MCP clients to fetch book prices programmatically.

## 📋 Overview

This MCP server implements a simple book price fetching service that can be integrated with any MCP-compatible client (such as Claude Desktop, IDEs, or custom applications). It exposes both tools and resources for querying book prices.

### What is MCP?

The Model Context Protocol (MCP) is an open protocol that standardizes how applications provide context to Large Language Models (LLMs). MCP servers can expose tools, resources, and prompts that AI assistants can discover and use dynamically.

## ✨ Features

- **Tool Integration**: Provides a `getPriceOfBookByName` tool that accepts a book name and returns its price
- **Resource Endpoint**: Exposes a `price://books` resource for accessing book price information
- **Type Safety**: Built with TypeScript and Zod for robust type validation
- **Simple Integration**: Uses stdio transport for easy integration with MCP clients

## 🔧 Prerequisites

- **Node.js** 18.x or higher
- **npm** or **yarn** package manager

## 📦 Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd book-price-mcp-server
```

2. Install dependencies:
```bash
npm install
```

## 🚀 Usage

### Running the Server

Start the MCP server using:

```bash
npm start
```

Or directly with tsx:

```bash
npx tsx server.ts
```

The server will start and listen for MCP client connections via stdio.

### Integrating with MCP Clients

#### Claude Desktop Configuration

Add this server to your Claude Desktop configuration file:

**MacOS**: `~/Library/Application Support/Claude/claude_desktop_config.json`
**Windows**: `%APPDATA%/Claude/claude_desktop_config.json`

```json
{
  "mcpServers": {
    "book-price-fetcher": {
      "command": "npx",
      "args": ["tsx", "/absolute/path/to/book-price-mcp-server/server.ts"]
    }
  }
}
```

Replace `/absolute/path/to/book-price-mcp-server/` with the actual path to your project directory.

## 📚 API Reference

### Tools

#### `getPriceOfBookByName`

Fetches the price of a book by its name.

**Parameters:**
- `bookName` (string, required): The name of the book to query

**Returns:**
- Price in rupees (string format)

**Example Usage:**
```typescript
// When called from an MCP client
{
  "bookName": "The Great Gatsby"
}
// Returns: "1700 rupees" (based on character length calculation)
```

### Resources

#### `price://books`

A resource endpoint that provides information about the book price service.

**URI**: `price://books`
**Content Type**: `text/plain`
**Description**: Provides price of books by name

## 🛠️ Development

### Project Structure

```
book-price-mcp-server/
├── server.ts           # Main MCP server implementation
├── package.json        # Project dependencies and scripts
├── package-lock.json   # Locked dependency versions
└── README.md          # This file
```

### Technology Stack

- **[@modelcontextprotocol/sdk](https://github.com/modelcontextprotocol/sdk)**: MCP SDK for building servers
- **[tsx](https://github.com/esbuild-kit/tsx)**: TypeScript execution environment
- **[zod](https://github.com/colinhacks/zod)**: Schema validation for type safety
- **TypeScript**: Type-safe development

### Extending the Server

To modify the price calculation logic, update the `getPriceOfBookByName` function in `server.ts`:

```typescript
async function getPriceOfBookByName(bookName: string) {
    // Replace with your actual price fetching logic
    // e.g., database query, API call, etc.
    return `${bookName.length * 100} rupees`;
}
```

### Adding New Tools

To add additional tools, use the `server.tool()` method:

```typescript
server.tool(
    'toolName',
    'Tool description',
    { paramName: z.string() },
    async ({ paramName }) => {
        // Tool implementation
        return {
            content: [{ type: 'text', text: 'result' }]
        }
    }
);
```

## 🧪 Testing

After starting the server, you can test it by:

1. Integrating with Claude Desktop (see configuration above)
2. Using any MCP-compatible client
3. Checking the console output for the "book price mcp started" message

## 📝 Notes

- The current implementation uses a mock price calculation (based on book name length)
- For production use, replace the mock logic with actual price data sources
- The server uses stdio transport for communication with MCP clients

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

ISC

## 🔗 Resources

- [Model Context Protocol Documentation](https://modelcontextprotocol.io)
- [MCP SDK Repository](https://github.com/modelcontextprotocol/sdk)
- [Claude Desktop](https://claude.ai/desktop)

## ❓ Troubleshooting

### Server doesn't start
- Ensure Node.js 18+ is installed: `node --version`
- Check that all dependencies are installed: `npm install`

### Claude Desktop doesn't detect the server
- Verify the absolute path in your configuration file
- Restart Claude Desktop after updating the configuration
- Check the server logs for error messages

### Connection issues
- Ensure the server is using stdio transport
- Verify no other process is interfering with stdin/stdout

---

**Built with ❤️ using the Model Context Protocol**

