# proxy-requests

Proxies all requests with node.js.

Can be done with setting `http_proxy` or `https_proxy` environment variables in linux system, but this works only for `curl` or `wget` commands. A program or an application will not respect these variables, as they are independent processes over the operating system.

One such program is prometheus, when you want the prometheus to scrap a particular endpoint which is behind a firewall or a corporate network, there is a confusing configuration that we need to write and their documentation does not make an effort to solve the situation

```yaml

    - job_name: 'web'
      proxy_url: ''
      static_config:
        - targets: ['', '']
```

The proxy url is applied to all of the targets, we have to choose the targets that should go via a proxy then we need to separate the targets from the collective job to individual job.

So this is a simple approach I took to proxy the requests to the actual endpoint for the prometheus to scrap.

