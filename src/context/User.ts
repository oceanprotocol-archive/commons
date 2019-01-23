import React from 'react';

export const userDefaults = {
  logged: false
};

export const User = React.createContext(
  userDefaults
);
