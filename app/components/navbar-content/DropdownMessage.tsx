import { useEffect, useRef, useState } from 'react';
import chatbot from '../../images/chatbot.svg';
import ReactMarkdown from 'react-markdown';
import { BiSend } from 'react-icons/bi';

type Message = {
	text: string;
	sender: 'user' | 'bot';
	time: string;
	read: boolean;
};

const DropdownMessage = () => {
	const [dropdownOpen, setDropdownOpen] = useState(false);
	const [messages, setMessages] = useState<Message[]>([]);
	const [input, setInput] = useState('');
	const chatEndRef = useRef<HTMLDivElement | null>(null);
	const [showPredefinedQuestions, setShowPredefinedQuestions] = useState(true);

	const predefinedQuestions = [
		'What are some tips to save money?',
		'What is the 50/30/20 budgeting rule?',
	];

	const handlePredefinedQuestionClick = (question: string) => {
		setShowPredefinedQuestions(false);
		const time = new Date().toLocaleTimeString([], {
			hour: '2-digit',
			minute: '2-digit',
		});
		const newUserMessage: Message = {
			text: question,
			sender: 'user',
			time,
			read: true,
		};
		setMessages((prev) => [...prev, newUserMessage]);
		processMessageToGeminiAPI(question);
	};

	const handleSend = () => {
		if (!input.trim()) return;

		const time = new Date().toLocaleTimeString([], {
			hour: '2-digit',
			minute: '2-digit',
		});
		const newUserMessage: Message = {
			text: input,
			sender: 'user',
			time,
			read: true,
		};
		setMessages((prev) => [...prev, newUserMessage]);
		setInput('');
		processMessageToGeminiAPI(newUserMessage.text);
	};

	const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
		if (e.key === 'Enter') {
			handleSend();
		}
	};

	// Fetch bot response
	const processMessageToGeminiAPI = async (userMessage: string) => {
		setMessages((prev) => [
			...prev,
			{ text: 'Loading your answer...', sender: 'bot', time: '', read: true },
		]);
		const apiRequestBody = { contents: [{ parts: [{ text: userMessage }] }] };

		try {
			const API_KEY = process.env.VITE_API_GENERATIVE_LANGUAGE_CLIENT;
			const response = await fetch(
				`https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${API_KEY}`,
				{
					method: 'POST',
					headers: { 'Content-Type': 'application/json' },
					body: JSON.stringify(apiRequestBody),
				}
			);
			const data = await response.json();
			const botMessage =
				data?.candidates?.[0]?.content?.parts?.[0]?.text ||
				'No response from bot';
			const botTime = new Date().toLocaleTimeString([], {
				hour: '2-digit',
				minute: '2-digit',
			});
			setMessages((prev) => [
				...prev.slice(0, -1),
				{ text: botMessage, sender: 'bot', time: botTime, read: true },
			]);
		} catch (error) {
			console.error('Error fetching from Google Gemini API:', error);
			setMessages((prev) => [
				...prev.slice(0, -1),
				{
					text: 'Sorry - Something went wrong. Please try again!',
					sender: 'bot',
					time: '',
					read: true,
				},
			]);
		}
	};

	useEffect(() => {
		if (chatEndRef.current) {
			chatEndRef.current.scrollIntoView({ behavior: 'smooth' });
		}
	}, [messages]);

	return (
		<li className="relative list-none">
			<button
				className="relative flex h-9 w-9 items-center justify-center rounded-full border-[0.5px] border-stroke bg-gray hover:text-primary dark:border-strokedark dark:bg-meta-4 dark:text-white"
				onClick={() => setDropdownOpen(!dropdownOpen)}
			>
				💬
			</button>

			{dropdownOpen && (
				<div className="absolute text-gray-800 -right-16 mt-2.5 flex h-100 w-80 flex-col rounded-xl border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
					<div className="flex items-center justify-between bg-indigo-600 text-white p-3">
						<div className="flex items-center">
							<img src={chatbot} alt="Logo" className="w-8 h-8" />
							<div className="ml-3">
								<p className="text-sm font-bold">Budget Breeze</p>
								<p className="text-xs text-green-400">● Online</p>
							</div>
						</div>
						<button
							className="text-white text-xl font-bold"
							onClick={() => {
								setDropdownOpen(false);
								setShowPredefinedQuestions(true); 
							}}
						>
							×
						</button>
					</div>

					{showPredefinedQuestions && (
						<div className="flex-1 overflow-y-auto space-y-2">
							<div className="flex flex-wrap justify-end space-y-2 p-3 bg-gray-100 dark:bg-gray-800">
								{predefinedQuestions.map((question, index) => (
									<button
										key={index}
										onClick={() => handlePredefinedQuestionClick(question)}
										className="inline-block px-4 py-2 max-w-xs border border-stroke text-sm text-right bg-gray-200 rounded-lg hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 dark:text-gray-200"
									>
										{question}
									</button>
								))}
							</div>
						</div>
					)}
					{!showPredefinedQuestions && (
						<div className="flex-1 overflow-y-auto p-4 space-y-2">
							{messages.map((msg, index) => (
								<div
									key={index}
									className={`text-sm ${
										msg.sender === 'user' ? 'text-right' : 'text-left'
									}`}
								>
									<div
										className={`inline-block px-4 py-2 rounded-lg max-w-xs ${
											msg.sender === 'user'
												? 'bg-indigo-600 text-white'
												: 'bg-gray-200 text-black dark:bg-gray-700 dark:text-white'
										}`}
									>
										{msg.sender === 'bot' ? (
											<ReactMarkdown>{msg.text}</ReactMarkdown>
										) : (
											msg.text
										)}
									</div>
									<div className="text-gray-400 text-xs mt-1">{msg.time}</div>
								</div>
							))}
							<div ref={chatEndRef} />
						</div>
					)}

					<div className="flex t-1 items-center border-t p-3">
						<input
							type="text"
							className="flex-1 border rounded-full px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-gray-800 dark:text-white"
							placeholder="Type your message here..."
							value={input}
							onChange={(e) => setInput(e.target.value)}
							onKeyDown={handleKeyPress}
						/>
						<BiSend
							onClick={handleSend}
							size={24}
							className="flex-shrink-0 ml-2 cursor-pointer hover:scale-110 transition-transform text-indigo-600 dark:text-indigo-400"
						/>
					</div>
				</div>
			)}
		</li>
	);
};

export default DropdownMessage;
