import { useState } from 'react'
import { motion } from 'framer-motion'
import { Save, Server, Database, Globe, Shield, RefreshCw, HardDrive, Cpu, MemoryStick, Network, ToggleLeft, ToggleRight } from 'lucide-react'

export default function AdminSystemConfig() {
  const [config, setConfig] = useState({
    environment: 'production',
    maintenanceMode: false,
    debugMode: false,
    cacheEnabled: true,
    cacheDriver: 'redis',
    sessionDriver: 'redis',
    queueDriver: 'redis',
    maxUploadSize: 10,
    timezone: 'Asia/Kolkata',
    language: 'en',
    pageSize: 50,
    apiRateLimit: 1000,
    corsOrigins: 'https://travelhub.com,https://admin.travelhub.com',
    maxConnections: 500,
    serverMemory: '8GB',
    serverCpu: '4 cores',
    diskSpace: '500GB SSD',
  })

  const [toggles, setToggles] = useState({
    maintenance: false,
    debug: false,
    cache: true,
    logging: true,
    autoBackup: true,
    sslEnforce: true,
  })

  const toggle = (key) => setToggles(prev => ({ ...prev, [key]: !prev[key] }))
  const update = (key, value) => setConfig(prev => ({ ...prev, [key]: value }))

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-extrabold text-heading">System Configuration</h1>
          <p className="text-sm text-text-secondary mt-0.5">Manage platform-wide system settings</p>
        </div>
        <button className="inline-flex items-center gap-2 px-4 py-2.5 gradient-bg text-white text-sm font-semibold rounded-xl shadow-glow">
          <Save className="w-4 h-4" /> Save Configuration
        </button>
      </div>

      {/* Server Info */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: 'Server Memory', value: config.serverMemory, icon: MemoryStick, color: 'text-blue-600 bg-blue-50' },
          { label: 'CPU Cores', value: config.serverCpu, icon: Cpu, color: 'text-violet-600 bg-violet-50' },
          { label: 'Disk Space', value: config.diskSpace, icon: HardDrive, color: 'text-emerald-600 bg-emerald-50' },
          { label: 'Max Connections', value: config.maxConnections, icon: Network, color: 'text-amber-600 bg-amber-50' },
        ].map((s, i) => (
          <motion.div key={s.label} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }} className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm">
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center mb-3 ${s.color}`}><s.icon className="w-5 h-5" /></div>
            <p className="text-sm text-text-secondary font-medium">{s.label}</p>
            <p className="text-lg font-extrabold text-heading mt-1">{s.value}</p>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* General Settings */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
          <div className="flex items-center gap-2 mb-5"><Server className="w-5 h-5 text-primary" /><h3 className="text-lg font-bold text-heading">General Settings</h3></div>
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium text-heading mb-1.5 block">Environment</label>
              <select value={config.environment} onChange={(e) => update('environment', e.target.value)} className="w-full px-4 py-2.5 text-sm bg-white border border-slate-200 rounded-xl focus:outline-none focus:border-primary">
                <option value="production">Production</option>
                <option value="staging">Staging</option>
                <option value="development">Development</option>
              </select>
            </div>
            <div>
              <label className="text-sm font-medium text-heading mb-1.5 block">Timezone</label>
              <select value={config.timezone} onChange={(e) => update('timezone', e.target.value)} className="w-full px-4 py-2.5 text-sm bg-white border border-slate-200 rounded-xl focus:outline-none focus:border-primary">
                <option value="Asia/Kolkata">Asia/Kolkata (IST)</option>
                <option value="Asia/Dubai">Asia/Dubai (GST)</option>
                <option value="Asia/Singapore">Asia/Singapore (SGT)</option>
                <option value="UTC">UTC</option>
              </select>
            </div>
            <div>
              <label className="text-sm font-medium text-heading mb-1.5 block">Default Language</label>
              <select value={config.language} onChange={(e) => update('language', e.target.value)} className="w-full px-4 py-2.5 text-sm bg-white border border-slate-200 rounded-xl focus:outline-none focus:border-primary">
                <option value="en">English</option>
                <option value="hi">Hindi</option>
                <option value="ar">Arabic</option>
                <option value="zh">Chinese</option>
              </select>
            </div>
            <div>
              <label className="text-sm font-medium text-heading mb-1.5 block">Max Upload Size (MB)</label>
              <input type="number" value={config.maxUploadSize} onChange={(e) => update('maxUploadSize', parseInt(e.target.value))} className="w-full px-4 py-2.5 text-sm bg-white border border-slate-200 rounded-xl focus:outline-none focus:border-primary" />
            </div>
            <div>
              <label className="text-sm font-medium text-heading mb-1.5 block">Default Page Size</label>
              <input type="number" value={config.pageSize} onChange={(e) => update('pageSize', parseInt(e.target.value))} className="w-full px-4 py-2.5 text-sm bg-white border border-slate-200 rounded-xl focus:outline-none focus:border-primary" />
            </div>
          </div>
        </div>

        {/* Cache & Drivers */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
          <div className="flex items-center gap-2 mb-5"><Database className="w-5 h-5 text-primary" /><h3 className="text-lg font-bold text-heading">Cache & Drivers</h3></div>
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium text-heading mb-1.5 block">Cache Driver</label>
              <select value={config.cacheDriver} onChange={(e) => update('cacheDriver', e.target.value)} className="w-full px-4 py-2.5 text-sm bg-white border border-slate-200 rounded-xl focus:outline-none focus:border-primary">
                <option value="redis">Redis</option>
                <option value="memcached">Memcached</option>
                <option value="file">File</option>
                <option value="database">Database</option>
              </select>
            </div>
            <div>
              <label className="text-sm font-medium text-heading mb-1.5 block">Session Driver</label>
              <select value={config.sessionDriver} onChange={(e) => update('sessionDriver', e.target.value)} className="w-full px-4 py-2.5 text-sm bg-white border border-slate-200 rounded-xl focus:outline-none focus:border-primary">
                <option value="redis">Redis</option>
                <option value="database">Database</option>
                <option value="file">File</option>
                <option value="cookie">Cookie</option>
              </select>
            </div>
            <div>
              <label className="text-sm font-medium text-heading mb-1.5 block">Queue Driver</label>
              <select value={config.queueDriver} onChange={(e) => update('queueDriver', e.target.value)} className="w-full px-4 py-2.5 text-sm bg-white border border-slate-200 rounded-xl focus:outline-none focus:border-primary">
                <option value="redis">Redis</option>
                <option value="database">Database</option>
                <option value="sqs">Amazon SQS</option>
                <option value="sync">Sync</option>
              </select>
            </div>
            <div>
              <label className="text-sm font-medium text-heading mb-1.5 block">API Rate Limit (req/min)</label>
              <input type="number" value={config.apiRateLimit} onChange={(e) => update('apiRateLimit', parseInt(e.target.value))} className="w-full px-4 py-2.5 text-sm bg-white border border-slate-200 rounded-xl focus:outline-none focus:border-primary" />
            </div>
            <div>
              <label className="text-sm font-medium text-heading mb-1.5 block">CORS Allowed Origins</label>
              <textarea value={config.corsOrigins} onChange={(e) => update('corsOrigins', e.target.value)} rows={2} className="w-full px-4 py-2.5 text-sm bg-white border border-slate-200 rounded-xl focus:outline-none focus:border-primary resize-none" />
            </div>
          </div>
        </div>

        {/* System Toggles */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
          <div className="flex items-center gap-2 mb-5"><Shield className="w-5 h-5 text-primary" /><h3 className="text-lg font-bold text-heading">System Toggles</h3></div>
          <div className="space-y-3">
            {[
              { key: 'maintenance', label: 'Maintenance Mode', desc: 'Take platform offline for updates' },
              { key: 'debug', label: 'Debug Mode', desc: 'Show detailed error messages' },
              { key: 'cache', label: 'Cache Enabled', desc: 'Enable response caching' },
              { key: 'logging', label: 'Request Logging', desc: 'Log all API requests' },
              { key: 'autoBackup', label: 'Auto Backup', desc: 'Daily automatic database backup' },
              { key: 'sslEnforce', label: 'Enforce SSL', desc: 'Force HTTPS connections only' },
            ].map(item => (
              <div key={item.key} className="flex items-center justify-between p-3 bg-slate-50 rounded-xl">
                <div><p className="text-sm font-semibold text-heading">{item.label}</p><p className="text-xs text-text-tertiary">{item.desc}</p></div>
                <button onClick={() => toggle(item.key)}>{toggles[item.key] ? <ToggleRight className="w-8 h-8 text-primary" /> : <ToggleLeft className="w-8 h-8 text-slate-300" />}</button>
              </div>
            ))}
          </div>
        </div>

        {/* System Status */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
          <div className="flex items-center justify-between mb-5">
            <div className="flex items-center gap-2"><Globe className="w-5 h-5 text-primary" /><h3 className="text-lg font-bold text-heading">System Status</h3></div>
            <button className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-primary bg-primary/10 rounded-lg hover:bg-primary/20"><RefreshCw className="w-3.5 h-3.5" /> Refresh</button>
          </div>
          <div className="space-y-3">
            {[
              { service: 'API Server', status: 'Operational', uptime: '99.98%', color: 'text-green-600 bg-green-50 border-green-200' },
              { service: 'Database (PostgreSQL)', status: 'Operational', uptime: '99.99%', color: 'text-green-600 bg-green-50 border-green-200' },
              { service: 'Redis Cache', status: 'Operational', uptime: '99.97%', color: 'text-green-600 bg-green-50 border-green-200' },
              { service: 'Queue Worker', status: 'Operational', uptime: '99.95%', color: 'text-green-600 bg-green-50 border-green-200' },
              { service: 'File Storage (S3)', status: 'Operational', uptime: '99.99%', color: 'text-green-600 bg-green-50 border-green-200' },
              { service: 'Email Service', status: 'Degraded', uptime: '98.50%', color: 'text-amber-600 bg-amber-50 border-amber-200' },
            ].map(s => (
              <div key={s.service} className="flex items-center justify-between p-3 bg-slate-50 rounded-xl">
                <div><p className="text-sm font-semibold text-heading">{s.service}</p><p className="text-xs text-text-tertiary">Uptime: {s.uptime}</p></div>
                <span className={`inline-flex items-center gap-1 text-xs font-medium px-2.5 py-1 rounded-full border ${s.color}`}>{s.status}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
