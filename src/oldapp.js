import { useState, useMemo } from 'react'
import { FilesViewer } from './FilesViewer'

const formatSize = size => {
  let i = Math.floor(Math.log(size) / Math.log(1024))
  return (
    (size / Math.pow(1024, i)).toFixed(2) * 1 + 
    ' ' +
    ['B', 'kB', 'MB', 'GB', 'TB'][i]
  )
}

function Oldapp() {
  const [path, setPath] = useState(window.mainAPI.getAppPath);

  const files = useMemo(
    () => {
      window.mainAPI
        .fileReaddirSync(path)
        .map(file => {
          const stats = window.mainAPI.fileStatSync(window.mainAPI.joinPath(path, file))
          return {
            name: file,
            size: stats.isFile() ? formatSize(stats.size ?? 0) : null,
            directory: stats.isDirectory()
          }
        })
        .sort((a, b) => {
          if (a.directory === b.directory) {
            return a.name.localeCompare(b.name)
          }
          return a.directory ? -1 : 1
        })},
      [path]
  )

  const onBack = () => setPath(window.mainAPI.dirPath(path))
  const onOpen = folder => setPath(window.mainAPI.joinPath(path, folder))

  const [searchString, setSearchString] = useState('')
  const filteredFiles = files.filter(s => s.name.startWith(searchString))

  return (
    <div className="container mt-2">
      <div className="form-group mt-4 mb-2">
        <input
          value={searchString}
          onChange={event => setSearchString(event.target.value)}
          className="form-control form-control-sm"
          placeholder="File search"
        />
      </div>
      <FilesViewer files={filteredFiles} onBack={onBack} onOpen={onOpen} />
    </div>
  )
}

export default Oldapp;
