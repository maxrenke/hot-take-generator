# Hot Take Generator

A simple, open-source application to transform your thoughts into sharp, concise, and provocative "hot takes" using various AI models. I often run into situation where I'm generating lots of random thoughts when I have conversation with my friends so I thought it'd be fun to have a way to document these thoughts into hot takes on Twitter and that inspired me to vibe code this.

## Features

- **AI-Powered Hot Take Generation**: Leverage OpenAI, Anthropic, or Google's AI models to generate controversial or thought-provoking statements.
- **Provider Selection**: Choose your preferred AI provider directly within the application.
- **Client-Side API Key Handling**: Your API key is used only for the current session and is never stored or shared, ensuring your privacy and security.
- **Intuitive UI**: A clean and easy-to-use interface for inputting thoughts and viewing generated hot takes.

## Live Demo

You can access a live demo of the Hot Take Generator here: [https://v0-hot-take-generator-ai.vercel.app/](https://v0-hot-take-generator-ai.vercel.app/)

## Getting Started

Follow these steps to get the Hot Take Generator up and running on your local machine.

### Prerequisites

- Node.js (v18 or higher recommended)
- npm
- An API key from one of the supported AI providers (OpenAI, Anthropic, or Google Generative AI).

### Installation

1.  **Clone the repository:**

    ```bash
    git clone https://github.com/zoz24/hot-take-generator.git
    cd hot-take-generator
    ```

2.  **Install dependencies:**

    ```bash
    npm install
    ```

3.  **Run the development server:**

    ```bash
    npm run dev
    # or
    yarn dev
    ```

    Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Usage

1.  **Select your AI Provider**: Choose between OpenAI, Anthropic, or Google from the dropdown.
2.  **Enter your API Key**: Input your API key for the selected provider. Remember, this key is only used for the current session and is not stored.
3.  **Type your thoughts**: Write down your ideas, opinions, or any topic you want to generate hot takes about in the "Your Thoughts" textarea.
4.  **Generate Hot Takes**: Click the "Generate Hot Takes" button. The AI will process your thoughts and present 3-5 concise hot takes.
5.  **Clear All**: Use the "Clear All" button to reset the input and generated takes.

## Contributing

Contributions are welcome! If you have suggestions for improvements, new features, or bug fixes, please feel free to open an issue or submit a pull request.

## License

This project is open-source and available under the [MIT License](LICENSE).

## Acknowledgements

A big thank you to the following projects for making this possible:

- [Next.js](https://nextjs.org/): The React framework for the web.
- [v0](https://v0.dev/): For the initial vibe coding and UI inspiration.
