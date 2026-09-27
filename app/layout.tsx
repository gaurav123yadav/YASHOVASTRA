import type { Metadata } from 'next';
import './globals.css';
import { Header } from '@/components/Header';

export const metadata: Metadata = { title: 'YASHOVASTRA — Laddu Gopal Shringar & Seva', description: 'Premium Laddu Gopal poshak, shringar, mukut, jewellery and seva essentials.' };
export default function RootLayout({children}:{children:React.ReactNode}) { return <html lang="hi"><body><Header />{children}<footer className="footer"><div><b>YASHOVASTRA</b><p>हर श्रृंगार में प्रेम, हर सेवा में समर्पण।</p></div><div><span>Shop</span><span>Size Guide</span><span>Help & Policies</span></div><small>© 2026 YASHOVASTRA. Crafted for devotion.</small></footer></body></html> }
