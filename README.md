This is a take-home project for [Fillout](https://fillout.com). The project is a navigation component that allows users to create, edit, sort and delete pages.

### **[Live demo](https://fillout-navigation-component-woad.vercel.app/)**

## Features

- Add new page through the `New page` button or by clicking the `+` button anywhere between two existing pages;
- Drag and drop to re-order pages;
- Double click to rename a page;
- Highlight active page and other pages are selectable. Also depending on the page the page content changes;
- Context menu where it is possible to `duplicate`, `delete` and `rename`. The rest of the options will only trigger a toast;

## Used packages

- **TailwindCSS** for styling;
- **Zustand** to mock the DB in-memory;
- **Framer-motion** for animations and re-order;
- **Shadcn** for UI components;
- **Zod** for form validations;
