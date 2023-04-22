import '@/styles/globals.css';
import { UserStorage } from '@/contexts/UserContext';

export default function App({ Component, pageProps }) {
  return (
    <UserStorage>
      <Component {...pageProps} />
    </UserStorage>
  );
}
