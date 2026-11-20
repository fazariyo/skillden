import { ContactProvider } from "@/components/contact/ContactContext";
import ContactPanel from "@/components/contact/ContactPanel";

/** Pages with the navbar + "Work with us" contact panel (home and service pages). */
export default function SiteLayout({ children }: LayoutProps<"/">) {
  return (
    <ContactProvider>
      {children}
      <ContactPanel />
    </ContactProvider>
  );
}
