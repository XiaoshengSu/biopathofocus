import { setupWorker } from 'msw/browser'
import { dashboardHandlers } from './handlers/dashboard'
import { sampleHandlers } from './handlers/sample'
import { typingHandlers } from './handlers/typing'
import { amrHandlers } from './handlers/amr'
import { vfHandlers } from './handlers/vf'
import { treeHandlers } from './handlers/tree'

export const worker = setupWorker(
  ...dashboardHandlers,
  ...sampleHandlers,
  ...typingHandlers,
  ...amrHandlers,
  ...vfHandlers,
  ...treeHandlers,
)
