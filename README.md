# Low Energy Adaptive Clustering Hierarchy (LEACH): 

## Description

LEACH is one of the most popular clustering algorithms for Wireless Sensor Network (WSN).
It forms clusters based on the received signal strength and uses the Cluster Head (CH) nodes as gateways to the BS. 
All the data processing such as data fusion and aggregation are locally performed within the cluster.

 LEACH forms clusters by using a distributed algorithm, where nodes make autonomous decisions without any centralised control. 

Initially a node decides to be a CH with a probability p and broadcasts its decision. 

Each non-CH node determines its cluster by choosing the CH that can be reached using the least communication energy. 

The role of being a CH is rotated periodically among the nodes of the cluster in order to balance the load. 
The rotation is performed by getting each node K to choose a random number between 0 and 1. 
Taken from the paper 
<a href="https://core.ac.uk/download/pdf/82600413.pdf" target="_blank">LEATCH: Low Energy Adaptive Tier Clustering Hierarchy<a>


![LEACH nodes](./images/sensors-leach.png)

A node K becomes a CH for the current rotation round if the number θ (Κ) is less than the following threshold:

![LEACH Threshold](./images/leach-threshold.png)


## Installation
1. Clone the repository: `git clone https://github.com/mariakourtesi/wireless-sensor-networks-leach`
2. Navigate to the project directory: `cd wireless-sensor-networks-leach`
3. Install the required dependencies: `npm ci`

Please note: you need Node v20

## Running the CLI
1. Build the app: `npm run build`
2. Install it locally: `npm install -g .`
3. Run the command: `wireless-network leach -n 10 -p 0.2 -r 2`

n: number of nodes
p: probability
r: number of rounds