function Footer() {
  return (
    <footer className="bg-white border-t border-slate-100 mt-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">

          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-primary-600 flex items-center justify-center">
              <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                  d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422A12.083 12.083 0 0112 21.012 12.083 12.083 0 015.84 10.578L12 14z" />
              </svg>
            </div>
            <div>
              <p className="font-display font-bold text-slate-700 text-sm">UniPortal</p>
              <p className="text-xs text-slate-400">University Student Management System</p>
            </div>
          </div>

          <p className="text-xs text-slate-400 text-center">
            Built with Spring Boot &nbsp;·&nbsp; © {new Date().getFullYear()} EVANZO
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
