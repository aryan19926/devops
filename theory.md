Docker: Images and Containers
Images: An image is a read-only template with instructions for creating a Docker container. You typically build an image for each part of your application (for example, one for the frontend and one for the backend). Each image contains everything needed to run that part of the app.
Containers: A container is a runnable instance of an image. When you start a container, Docker uses the image as a blueprint to create the container.
So, the flow is: Docker → Images → Containers

Frontend and Backend Example
If your app has a frontend and a backend, you would usually:

Build a separate Docker image for the frontend (from the frontend folder)
Build a separate Docker image for the backend (from the backend folder)
This allows you to run each part of your app in its own container, which is a common practice for multi-component applications.

You can use tools like Docker Compose to define and run both containers together, making it easy to manage multi-container applications.


https://docs.docker.com/get-started/docker-overview/#what-can-i-use-docker-for 



To build the image, you'll need to use a Dockerfile. A Dockerfile is simply a text-based file with no file extension that contains a script of instructions. Docker uses this script to build a container image.