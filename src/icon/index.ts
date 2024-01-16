const requireContext = require.context('./svg', false, /\.svg$/)

function requireAll(requireContext: __WebpackModuleApi.RequireContext) {
  requireContext.keys().map(requireContext)
}

requireAll(requireContext)
