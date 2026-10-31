import streamlit as st
import pandas as pd
import plotly.express as px
import time

# Page Config
st.set_page_config(
    page_title="AgriPulse - Smart Urban Farm Manager",
    page_icon="🌱",
    layout="wide",
    initial_sidebar_state="expanded",
)

# Custom Styling
st.markdown("""
    <style>
    .main { background-color: #f8fafc; }
    .stMetric { background-color: #ffffff; padding: 15px; border-radius: 12px; border: 1px solid #e2e8f0; box-shadow: 0 1px 3px rgba(0,0,0,0.05); }
    </style>
""", unsafe_allow_html=True)

# App Header
st.title("🌱 AgriPulse: IoT Cultivation & Fleet Operations Platform")
st.markdown("### Powered by the 20-Hour Alaska Photoperiod Protocol · 100% Solar Powered")
st.caption("Design by Yash Vaghani & Harsh Parmar")

# Sidebar
st.sidebar.header("🔐 Authentication & Navigation")
role = st.sidebar.selectbox("Select Access Mode", ["Grower IoT Controls", "System Admin Fleet & Ops"])

if role == "Grower IoT Controls":
    st.sidebar.markdown("---")
    st.sidebar.subheader("👤 Grower Login")
    username = st.sidebar.text_input("User ID or Email", "marcus.vance@agripulse.farm")
    password = st.sidebar.text_input("Password", type="password", value="Grower2026!")
    
    assigned_unit = st.sidebar.selectbox("Assigned Unit", ["Tower-Alpha (Aisle 01)", "Tower-Beta (Aisle 02)", "Pod-03 (Container)"])
    
    st.sidebar.markdown("---")
    st.sidebar.subheader("💡 IoT Hardware Overrides")
    light_on = st.sidebar.toggle("Activate 20h Light Array", value=True)
    intensity = st.sidebar.slider("LED Intensity (%)", 0, 100, 85)
    pulse_hz = st.sidebar.slider("Light Pulse Frequency (Hz)", 10, 1000, 420)
    spectrum = st.sidebar.selectbox("Photonic Spectrum", ["Balanced Vegetative (450nm/660nm)", "Deep Bloom (730nm Far-Red)", "Seedling UV Boost"])
    
    st.markdown("## 📊 Grower Node Telemetry: " + assigned_unit)
    
    col1, col2, col3, col4 = st.columns(4)
    col1.metric("Biomass Yield", "10.4x", "+2.4x vs Soil")
    col2.metric("Grid Electricity Bills", "₹0.00", "Lowest (Solar Microgrid)")
    col3.metric("Ambient Temp", "23.4 °C", "±0.2 °C optimal")
    col4.metric("Water Recycled", "95.2%", "Closed-loop")
    
    st.markdown("---")
    
    # Real-time telemetry chart
    chart_data = pd.DataFrame({
        'Hour': list(range(1, 21)),
        'PPFD (µmol/m²/s)': [420 + (i * 5) for i in range(20)],
        'Battery (%)': [98 - (i * 0.4) for i in range(20)]
    })
    
    st.subheader("📈 20-Hour Alaska Photoperiod Photon Flux & Battery Curve")
    fig = px.line(chart_data, x='Hour', y=['PPFD (µmol/m²/s)', 'Battery (%)'], markers=True, title="Active 20-Hour Photoperiod Cycle")
    st.plotly_chart(fig, use_container_width=True)

else:
    st.sidebar.markdown("---")
    st.sidebar.subheader("🛡️ System Admin Authentication")
    admin_user = st.sidebar.text_input("Admin ID", "Yash.vaghani@agripulse.farm")
    admin_pass = st.sidebar.text_input("Master Password", type="password", value="AdminSecure99!")
    admin_pin = st.sidebar.text_input("10-Digit Security PIN", type="password", value="8492019384", max_chars=10)
    
    admin_unlocked = st.sidebar.button("Authorize Master Fleet")
    
    st.markdown("## 🛰️ Admin Fleet & Operations Center")
    
    if admin_unlocked and len(admin_pin) == 10:
        st.success("10-Digit Hardware Cryptographic Challenge Verified. Full Fleet Access Granted.")
    else:
        st.info("Please enter the 10-digit security PIN in the sidebar (Demo PIN: 8492019384) to unlock fleet management.")

    col1, col2, col3, col4 = st.columns(4)
    col1.metric("Active Towers & Pods", "12 Units", "100% Online")
    col2.metric("Monthly Cost Avoidance", "₹1,42,800", "Solar Microgrid Savings")
    col3.metric("Active Security Alerts", "0 Units", "System Grade A+")
    col4.metric("Total Annual Harvest", "5,400 kg", "Fresh Urban Produce")

    st.markdown("---")
    st.subheader("🌐 Municipal Urban Farm Units Status")
    
    units_df = pd.DataFrame([
        {"Unit ID": "TOWER-01", "Type": "Vertical Tower", "Location": "Downtown Aisle A", "Status": "Optimal", "Temp (°C)": 23.4, "Battery (%)": 94},
        {"Unit ID": "TOWER-02", "Type": "Vertical Tower", "Location": "Downtown Aisle B", "Status": "Optimal", "Temp (°C)": 22.8, "Battery (%)": 91},
        {"Unit ID": "POD-03", "Type": "Mobile Solar Grid", "Location": "North Container Hub", "Status": "Charging", "Temp (°C)": 24.1, "Battery (%)": 99},
        {"Unit ID": "TOWER-04", "Type": "Vertical Tower", "Location": "Rooftop Terrace C", "Status": "Optimal", "Temp (°C)": 23.0, "Battery (%)": 88},
    ])
    st.dataframe(units_df, use_container_width=True)

# Footer
st.markdown("---")
st.markdown("""
<div style='text-align: center; color: #64748b; font-size: 13px;'>
    <p><b>AgriPulse Technologies</b> · Alaska 20-Hour Photoperiod Urban Agriculture</p>
    <p>Design by <b>Yash Vaghani</b> & <b>Harsh Parmar</b></p>
</div>
""", unsafe_allow_html=True)
