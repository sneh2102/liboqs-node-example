# Post-Quantum Key Encapsulation Example

This repository contains an example of using the `liboqs-node` library for key encapsulation mechanisms (KEMs) based on post-quantum cryptography.

## Prerequisites

Before running the example, ensure you have the following installed:

- Ubuntu Linux 20.04.6
- Python 3
- Node.js (version 14 or higher)
- npm (Node Package Manager)
- Git
- OpenSSL (version 1.1.1 or higher)

## Setting Up the Environment

### 1. Install Dependencies

#### For Ubuntu:

Open your terminal and run the following command to install the necessary dependencies:

```bash
sudo apt install astyle cmake gcc ninja-build libssl-dev python3-pytest python3-pytest-xdist unzip xsltproc doxygen graphviz python3-yaml valgrind git
```
### 2. Install liboqs Library
Clone the liboqs repository and build the library:

```bash
git clone -b main https://github.com/open-quantum-safe/liboqs.git
cd liboqs
mkdir build && cd build
cmake -GNinja ..
ninja
```
To install the built library, run:

```bash
ninja install
```
### 3. Clone Example code 

```
git clone https://github.com/sneh2102/liboqs-node-example.git
cd liboqs-node-example.
```

Install all the dependencies

```bash
npm install
```

### 4. Run the Code
```bash
node Kems.js
```