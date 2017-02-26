export default async (assetName) => {
  const releasesURL = 'https://api.github.com/repos/angeloashmore/boh-labels-db/releases/latest'
  const releasesData = await fetch(releasesURL)
  const releases = await releasesData.json()

  const asset = releases.assets.find((asset) => asset.name === assetName)

  const result = await fetch(asset.browser_download_url)
  const json = await result.json()

  return json
}
