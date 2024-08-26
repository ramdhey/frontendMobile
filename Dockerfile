# Gunakan Ubuntu versi terbaru sebagai base image
FROM ubuntu:22.04

LABEL Description="This image provides a base Android and React Native development environment, and may be used to run tests."

# Set environment variables for Android SDK
ENV SDK_URL="https://dl.google.com/android/repository/commandlinetools-linux-11076708_latest.zip"
ENV ANDROID_HOME=/opt/android
ENV ANDROID_BUILD_TOOLS_VERSION=33.0.0
ENV ANDROID_VERSION=33
ENV PATH="$PATH:$ANDROID_HOME/cmdline-tools/latest/bin:$ANDROID_HOME/platform-tools:$ANDROID_HOME/emulator"

# Node version
ARG NODE_VERSION=19.8.1

# Update system and install dependencies
RUN apt-get update -qq && apt-get install -qq -y --no-install-recommends \
       wget \
       curl \
       build-essential \
       file \
       git \
       gnupg2 \
       openjdk-17-jdk \
       python3 \
       python3-pip \
       ruby-full \
       openssh-client \
       zip \
       unzip \
    && rm -rf /var/lib/apt/lists/*

# Install Node.js using nvm and global packages
# Install Node.js using nvm and global packages
RUN curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.1/install.sh | bash \
    && . $HOME/.nvm/nvm.sh \
    && nvm install $NODE_VERSION \
    && nvm use $NODE_VERSION \
    && nvm alias default $NODE_VERSION \
    && ln -s $(which node) /usr/local/bin/node \
    && ln -s $(which npm) /usr/local/bin/npm \
    && ln -s $(which npx) /usr/local/bin/npx

# Setup Android SDK
RUN mkdir -p $ANDROID_HOME/cmdline-tools && \
    wget -q -O /tmp/sdk.zip $SDK_URL && \
    unzip -q /tmp/sdk.zip -d $ANDROID_HOME/cmdline-tools && \
    mv $ANDROID_HOME/cmdline-tools/cmdline-tools $ANDROID_HOME/cmdline-tools/latest && \
    rm /tmp/sdk.zip && \
    yes | $ANDROID_HOME/cmdline-tools/latest/bin/sdkmanager --licenses && \
    $ANDROID_HOME/cmdline-tools/latest/bin/sdkmanager --list && \
    yes | $ANDROID_HOME/cmdline-tools/latest/bin/sdkmanager "platform-tools" "platforms;android-33" "build-tools;33.0.0"

# Clean up
RUN rm -rf $ANDROID_HOME/.android

# Set the working directory
WORKDIR /usr/src/app

# Copy the project files to the container
COPY . .

# Install project dependencies
RUN npm install --legacy-peer-deps

# The final command to run when the container starts
CMD ["npx", "react-native", "run-android"]