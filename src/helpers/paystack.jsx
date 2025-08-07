const PAYSTACK_SECRET = import.meta.env.VITE_PAYSTACK_PUBLIC_KEY;
// Get all supported banks
export async function getBanks() {
  const response = await fetch('https://api.paystack.co/bank', {
    headers: {
      Authorization: `Bearer ${PAYSTACK_SECRET}`,
    },
  });
  const data = await response.json();
  return data.data; // Array of banks
}

// Resolve account name
export async function resolveAccount(accountNumber, bankCode) {
  const url = `https://api.paystack.co/bank/resolve?account_number=${accountNumber}&bank_code=${bankCode}`;

  const response = await fetch(url, {
    headers: {
      Authorization: `Bearer ${PAYSTACK_SECRET}`,
    },
  });

  const data = await response.json();
  return data.data; // { account_name, account_number }
}
