import Typography from "@/app/components/Typography";

export default function HomePage() {
  const templates = [
    {
      title: "Portfolio Template",
      description:
        "A minimal and stylish template perfect for designers and developers to showcase their work.",
    },
    {
      title: "Business Template",
      description:
        "A clean and professional design for corporate websites and startups looking for a strong online presence.",
    },
    {
      title: "E-Commerce Template",
      description:
        "A responsive template tailored for online stores with beautiful product layouts and shopping features.",
    },
    {
      title: "Blog Template",
      description:
        "A content-focused layout ideal for bloggers, writers, and storytellers with elegant typography.",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 text-gray-800 px-6 py-12">
      <div className="max-w-4xl mx-auto">
        {/* Header Section */}
        <Typography className="text-center">
          Creative Website Design Templates
        </Typography>

        <p className="text-lg text-center text-gray-600 mb-12">
          Discover modern, responsive, and beautifully crafted templates for
          your next web project.
        </p>

        {/* Templates Section */}
        <div className="grid md:grid-cols-2 gap-8">
          {templates.map((template, index) => (
            <div
              key={index}
              className="bg-white shadow-md rounded-xl p-6 hover:shadow-xl transition"
            >
              <Typography className="text-2xl mb-3">
                {template.title}
              </Typography>
              <p className="text-gray-600">{template.description}</p>
            </div>
          ))}
        </div>

        {/* Footer Section */}
        <div className="mt-16 text-center text-gray-500 text-sm">
          © 2025 YourBrand. All rights reserved.
        </div>
      </div>
    </div>
  );
}
