import axios from 'axios';

const windowSize = 10;
let numbers = [];
let windowPrevState = [];
let windowCurrState = [];

const calculateAverage = (arr) => {
  const sum = arr.reduce((acc, num) => acc + num, 0);
  return arr.length > 0 ? sum / arr.length : 0;
};

const fetchNumbersFromTestServer = async (numberid, authToken) => {
  let apiUrl = '';

  switch (numberid) {
    case 'p':
      apiUrl = 'http://20.244.56.144/test/primes';
      break;
    case 'f':
      apiUrl = 'http://20.244.56.144/test/fibo';
      break;
    case 'e':
      apiUrl = 'http://20.244.56.144/test/even';
      break;
    case 'r':
      apiUrl = 'http://20.244.56.144/test/random';
      break;
    default:
      throw new Error('Invalid number ID qualifier.');
  }

  try {
    const response = await axios.get(apiUrl, {
      headers: {
        Authorization: `${authToken}`,
      },
    });
    return response.data.numbers;
  } catch (error) {
    console.error('Error fetching data from the test server:', error.message);
    throw new Error('Failed to fetch data from the test server.');
  }
};

const updateWindowState = (receivedNumbers) => {
  windowPrevState = [...windowCurrState];
  windowCurrState = [...numbers, ...receivedNumbers.slice(0, windowSize)];
  numbers = windowCurrState.slice(-windowSize);
};

const getNumbers = async (req, res) => {
  const { numberid } = req.params;
  const authToken = req.headers.authorization;

  if (!authToken) {
    return res.status(401).json({ error: 'Authorization token missing.' });
  }

  const validQualifiers = ['p', 'f', 'e', 'r'];
  if (!validQualifiers.includes(numberid)) {
    return res.status(400).json({ error: 'Invalid number ID qualifier.' });
  }

  try {
    const receivedNumbers = await fetchNumbersFromTestServer(numberid, authToken);
    updateWindowState(receivedNumbers);
    const avg = calculateAverage(windowCurrState);

    res.json({
      numbers: receivedNumbers,
      windowPrevState,
      windowCurrState,
      avg: avg.toFixed(2),
    });
  } catch (error) {
    console.error('Error:', error.message);
    res.status(500).json({ error: 'Failed to fetch data from the test server.' });
  }
};

export { getNumbers };
