import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { PostProvider } from './context/postContext';
import { UserProvider } from './context/userContext';
import { MarketProvider } from './context/marketContext'
import { GroupProvider } from './context/groupContext';
import { ChatProvider } from './context/chatContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <UserProvider>
      <PostProvider>
        <MarketProvider>
          <GroupProvider>
            <ChatProvider>
              <App/>
            </ChatProvider>
          </GroupProvider>
        </MarketProvider>
      </PostProvider>
    </UserProvider>
  </React.StrictMode>
);
