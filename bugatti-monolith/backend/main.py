import os
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import random

app = FastAPI()

# Enable CORS for Next.js frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # In production, specify the exact origin
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/telemetry")
async def get_telemetry():
    """
    Returns high-end telemetry data for the Bugatti Chiron.
    """
    return {
        "engine": {
            "w16_firing_order": [1, 12, 5, 8, 3, 14, 7, 10, 15, 4, 11, 2, 9, 6, 13, 16],
            "torque_nm": random.randint(1550, 1600),
            "rpm": random.randint(2000, 6700),
            "boost_pressure_bar": round(random.uniform(1.8, 2.0), 2)
        },
        "tyres": {
            "pressure_psi": {
                "front_left": 32.5,
                "front_right": 32.5,
                "rear_left": 36.0,
                "rear_right": 36.0
            },
            "temperature_c": random.randint(40, 85),
            "slip_angle": round(random.uniform(0.1, 0.5), 2)
        },
        "aerodynamics": {
            "drag_coefficient": 0.35,
            "downforce_n": random.randint(5000, 6000),
            "wing_angle_deg": 3.0
        }
    }

if __name__ == "__main__":
    import uvicorn
    port = int(os.environ.get("PORT", 8001))
    uvicorn.run(app, host="0.0.0.0", port=port)
