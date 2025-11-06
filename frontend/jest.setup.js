import { TextEncoder, TextDecoder } from "util";
import '@testing-library/jest-dom';

global.TextEncoder = TextEncoder;
global.TextDecoder = TextDecoder;

// Mock import.meta.env for Vite projects 
global.VITE_BACKEND_URL = "http://localhost:5000";
