
export default function DevfolioFooter() {
  return (
    <footer className="w-full bg-[#f8f9fb]">
      <div className="max-w-7xl mx-auto px-20 py-16">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 mb-12">
          {/* Brand Section */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 rounded-lg flex items-center justify-center text-white font-bold text-xl" style={{ backgroundColor: 'oklch(54.6% 0.245 262.881)' }}>
                D
              </div>
              <span className="text-xl font-bold text-gray-900">devfolio</span>
            </div>
            <p className="text-sm text-gray-600 mb-6 leading-relaxed">
              Build, customize and launch your developer portfolio with ease. Beautiful templates, powerful customization.
            </p>
            <div className="flex gap-4">
              <a href="#" className="text-gray-500 hover:text-gray-900 transition-colors">
                {/* <Github className="w-5 h-5" /> */}
              </a>
              <a href="#" className="text-gray-500 hover:text-gray-900 transition-colors">
                {/* <Twitter className="w-5 h-5" /> */}
              </a>
              <a href="#" className="text-gray-500 hover:text-gray-900 transition-colors">
                {/* <Linkedin className="w-5 h-5" /> */}
              </a>
              <a href="#" className="text-gray-500 hover:text-gray-900 transition-colors">
                {/* <MessageCircle className="w-5 h-5" /> */}
              </a>
            </div>
          </div>

          {/* Product Column */}
          <div>
            <h3 className="font-semibold text-gray-900 mb-4">Product</h3>
            <ul className="space-y-3">
              <li><a href="#" className="text-sm text-gray-600 hover:text-gray-900 transition-colors">Features</a></li>
              <li><a href="#" className="text-sm text-gray-600 hover:text-gray-900 transition-colors">Templates</a></li>
              <li><a href="#" className="text-sm text-gray-600 hover:text-gray-900 transition-colors">Pricing</a></li>
              <li><a href="#" className="text-sm text-gray-600 hover:text-gray-900 transition-colors">Roadmap</a></li>
              <li><a href="#" className="text-sm text-gray-600 hover:text-gray-900 transition-colors">Changelog</a></li>
            </ul>
          </div>

          {/* Resources Column */}
          <div>
            <h3 className="font-semibold text-gray-900 mb-4">Resources</h3>
            <ul className="space-y-3">
              <li><a href="#" className="text-sm text-gray-600 hover:text-gray-900 transition-colors">Docs</a></li>
              <li><a href="#" className="text-sm text-gray-600 hover:text-gray-900 transition-colors">Guides</a></li>
              <li><a href="#" className="text-sm text-gray-600 hover:text-gray-900 transition-colors">Blog</a></li>
              <li><a href="#" className="text-sm text-gray-600 hover:text-gray-900 transition-colors">Help Center</a></li>
              <li><a href="#" className="text-sm text-gray-600 hover:text-gray-900 transition-colors">Community</a></li>
            </ul>
          </div>

          {/* Company Column */}
          <div>
            <h3 className="font-semibold text-gray-900 mb-4">Company</h3>
            <ul className="space-y-3">
              <li><a href="#" className="text-sm text-gray-600 hover:text-gray-900 transition-colors">About Us</a></li>
              <li><a href="#" className="text-sm text-gray-600 hover:text-gray-900 transition-colors">Careers</a></li>
              <li><a href="#" className="text-sm text-gray-600 hover:text-gray-900 transition-colors">Contact</a></li>
              <li><a href="#" className="text-sm text-gray-600 hover:text-gray-900 transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="text-sm text-gray-600 hover:text-gray-900 transition-colors">Terms of Service</a></li>
            </ul>
          </div>

          {/* Support Column */}
          <div>
            <h3 className="font-semibold text-gray-900 mb-4">Support</h3>
            <ul className="space-y-3">
              <li><a href="#" className="text-sm text-gray-600 hover:text-gray-900 transition-colors">Help Center</a></li>
              <li><a href="#" className="text-sm text-gray-600 hover:text-gray-900 transition-colors">Contact Us</a></li>
              <li><a href="#" className="text-sm text-gray-600 hover:text-gray-900 transition-colors">Status</a></li>
              <li><a href="#" className="text-sm text-gray-600 hover:text-gray-900 transition-colors">Feedback</a></li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-200 mb-8"></div>

        {/* Newsletter Section */}
        <div className="bg-gradient-to-r from-purple-50 to-blue-50 rounded-2xl p-8 mb-8 shadow-sm">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0" style={{ backgroundColor: 'oklch(54.6% 0.245 262.881 / 0.1)' }}>
                {/* <Mail className="w-6 h-6" style={{ color: 'oklch(54.6% 0.245 262.881)' }} /> */}
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-1">Stay in the loop</h3>
                <p className="text-sm text-gray-600">Subscribe to get updates, tips and new features delivered to your inbox.</p>
              </div>
            </div>
            <div className="flex gap-2 w-full lg:w-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 lg:w-64 px-4 py-2.5 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 bg-white"
                style={{ '--tw-ring-color': 'oklch(54.6% 0.245 262.881)' }}
              />
              <button
                className="px-6 py-2.5 text-white font-medium rounded-lg hover:shadow-lg transition-all"
                style={{ backgroundColor: 'oklch(54.6% 0.245 262.881)' }}
              >
                Subscribe
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 text-sm text-gray-600">
          <p>© 2024 Devfolio. All rights reserved.</p>
          <p className="flex items-center gap-1">
            <span style={{ color: 'oklch(54.6% 0.245 262.881)' }}>💜</span> Built with passion for developers
          </p>
        </div>
      </div>
    </footer>
  );
}
