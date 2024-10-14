import ReactGA from 'react-ga';

export const initGA = () => {
  ReactGA.initialize('G-W469X6YK0B');
};

export const logPageView = () => {
  ReactGA.set({ page: window.location.pathname + window.location.search });
  ReactGA.pageview(window.location.pathname + window.location.search);
};
