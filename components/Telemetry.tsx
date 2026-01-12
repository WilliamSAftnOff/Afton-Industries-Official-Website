
import React, { useState, useEffect } from 'react';

const Telemetry: React.FC = () => {
  const [metrics, setMetrics] = useState({
    busLoad: 22.5,
    servoVoltage: 5.01,
    jitterMs: 0.04,
    powerDraw: 120
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setMetrics(prev => ({
        busLoad: Math.min(100, Math.max(0, prev.busLoad + (Math.random() - 0.5) * 2)),
        servoVoltage: 5.0 + (Math.random() - 0.5) * 0.1,
        jitterMs: Math.max(0.01, 0.04 + (Math.random() - 0.5) * 0.01),
        powerDraw: 120 + (Math.random() - 0.5) * 5
      }));
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="py-20 bg-black border-y border-purple-900/20 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center justify-between mb-12">
          <div>
            <h2 className="text-3xl font-bold uppercase tracking-tighter">Proto <span className="text-purple-600">Telemetry</span></h2>
            <p className="text-slate-500 text-sm mono mt-2">LINK: SERIAL_CH_01_USB</p>
          </div>
          <div className="flex items-center space-x-4 mt-4 md:mt-0">
            <div className="px-3 py-1 bg-green-500/10 border border-green-500/50 text-green-500 text-[10px] mono uppercase">Baud Rate: 115200</div>
            <div className="px-3 py-1 bg-purple-500/10 border border-purple-500/50 text-purple-400 text-[10px] mono uppercase">Protocol: AF-MODBUS</div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { label: 'Bus Load', value: `${metrics.busLoad.toFixed(1)}%`, trend: 'NOMINAL' },
            { label: 'Servo Rails', value: `${metrics.servoVoltage.toFixed(2)}V`, trend: 'STABLE' },
            { label: 'UART Jitter', value: `${metrics.jitterMs.toFixed(3)}ms`, trend: 'LOW' },
            { label: 'Current Draw', value: `${metrics.powerDraw.toFixed(0)}mA`, trend: 'STABLE' }
          ].map((item, i) => (
            <div key={i} className="bg-slate-900/20 border border-slate-800 p-6 relative group overflow-hidden">
              <div className="absolute top-0 left-0 w-1 h-full bg-purple-600/20 group-hover:bg-purple-600 transition-colors"></div>
              <div className="text-[10px] mono text-slate-500 uppercase tracking-widest mb-2">{item.label}</div>
              <div className="text-3xl font-bold text-white mb-4">{item.value}</div>
              <div className="flex items-center justify-between">
                <div className="h-1 w-24 bg-slate-800 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-purple-500 transition-all duration-1000" 
                    style={{ width: `${Math.random() * 100}%` }}
                  ></div>
                </div>
                <span className="text-[9px] mono text-purple-400">{item.trend}</span>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-12 bg-slate-900/10 border border-slate-800 p-4 mono text-[10px] text-slate-600 overflow-hidden whitespace-nowrap">
          <span className="text-purple-500 mr-4">LOG_STREAM:</span>
          <span className="animate-pulse">
            [SYS] BOOT_SEQUENCE_COMPLETE | [LINK] SERIAL_ATTACH_SUCCESS | [MCU] ESP32_CORE_0_ALIVE | [AI] MIMIC_IDLE_STATE | [PID] CALIBRATING_SERVO_A1...
          </span>
        </div>
      </div>
    </section>
  );
};

export default Telemetry;
