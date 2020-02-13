const axios = require("axios");
const express = require("express");

function proxy_server(proxy, metrics_endpoint, server_port) {
    express()
    .get("/metrics", async (req, res) => {
        try {
            const response = await axios.get(metrics_endpoint, {
                proxy: {
                    host: proxy.host,
                    port: proxy.port
                }
            });
            res.send(response.data)
        } catch (err) {
            console.error("Error while making the requests");
            console.error(err);
            res.status(500).send()
        }
    })
    .listen(server_port, (err) => {
        if (err) {
            console.error("Error starting the proxy server on port ", server_port);
            console.error(err);
            return;
        } else {
            console.info("> Started proxy server on port ", server_port)
        }
    })

}

// Can spin up as many proxy server till your machine network channel permits you to.
proxy_server({ host: "<proxy-host>", port: "<proxy-port>" }, "<metrics-endpoint-behind-the-firewall>", 5001)
proxy_server({ host: "<proxy-host>", port: "<proxy-port>" }, "<metrics-endpoint-behind-the-firewall>", 5002)
