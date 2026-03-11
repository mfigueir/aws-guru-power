# Three-Tier Web Application Template

Use this template to quickly create a three-tier web application architecture.

## Template Prompt

```
Create a three-tier web application architecture with:

**Presentation Tier:**
- Application Load Balancer in public subnets
- CloudFront CDN (optional)
- Route53 for DNS (optional)

**Application Tier:**
- EC2 Auto Scaling group with [NUMBER] instances
- Instance type: [INSTANCE_TYPE] (e.g., t3.medium)
- Deployed in private subnets across [NUMBER] availability zones
- NAT Gateway for outbound internet access

**Data Tier:**
- RDS [DATABASE_ENGINE] (e.g., MySQL, PostgreSQL)
- Instance type: [DB_INSTANCE_TYPE] (e.g., db.t3.medium)
- Multi-AZ deployment: [YES/NO]
- Storage: [SIZE] GB
- ElastiCache [CACHE_ENGINE] (optional)

**Additional Components:**
- S3 bucket for static assets
- CloudWatch for monitoring and logs
- Security Groups for each tier
- VPC with public and private subnets

**Region:** [AWS_REGION] (e.g., us-east-1)

Then estimate the monthly cost including:
- [TRAFFIC_IN] TB data transfer in
- [TRAFFIC_OUT] TB data transfer out
- [REQUESTS] requests per month
```

## Example 1: Small Startup

```
Create a three-tier web application architecture with:

**Presentation Tier:**
- Application Load Balancer in public subnets

**Application Tier:**
- EC2 Auto Scaling group with 2 instances
- Instance type: t3.small
- Deployed in private subnets across 2 availability zones
- NAT Gateway for outbound internet access

**Data Tier:**
- RDS MySQL
- Instance type: db.t3.micro
- Multi-AZ deployment: NO
- Storage: 20 GB

**Additional Components:**
- S3 bucket for static assets (100 GB)
- CloudWatch for monitoring and logs
- Security Groups for each tier
- VPC with public and private subnets

**Region:** us-east-1

Then estimate the monthly cost including:
- 0.5 TB data transfer in
- 0.5 TB data transfer out
- 100,000 requests per month
```

## Example 2: Production Application

```
Create a three-tier web application architecture with:

**Presentation Tier:**
- Application Load Balancer in public subnets
- CloudFront CDN
- Route53 for DNS

**Application Tier:**
- EC2 Auto Scaling group with 4-10 instances
- Instance type: t3.medium
- Deployed in private subnets across 2 availability zones
- NAT Gateway for outbound internet access

**Data Tier:**
- RDS MySQL
- Instance type: db.t3.medium
- Multi-AZ deployment: YES
- Storage: 100 GB
- ElastiCache Redis (cache.t3.micro)

**Additional Components:**
- S3 bucket for static assets (500 GB)
- CloudWatch for monitoring and logs
- Security Groups for each tier
- VPC with public and private subnets

**Region:** us-east-1

Then estimate the monthly cost including:
- 2 TB data transfer in
- 2 TB data transfer out
- 1 million requests per month

Also provide optimization recommendations.
```

## Example 3: Enterprise Application

```
Create a three-tier web application architecture with:

**Presentation Tier:**
- Application Load Balancer in public subnets
- CloudFront CDN with custom SSL
- Route53 with health checks and failover

**Application Tier:**
- EC2 Auto Scaling group with 6-20 instances
- Instance type: m5.large
- Deployed in private subnets across 3 availability zones
- NAT Gateway in each AZ
- Systems Manager for patch management

**Data Tier:**
- RDS PostgreSQL
- Instance type: db.m5.xlarge
- Multi-AZ deployment: YES
- Storage: 500 GB with automated backups
- ElastiCache Redis cluster (3 nodes, cache.m5.large)
- Read replicas: 2

**Additional Components:**
- S3 bucket for static assets (2 TB)
- S3 bucket for backups (1 TB)
- CloudWatch for monitoring and logs (50 GB/month)
- CloudWatch alarms (20 alarms)
- AWS WAF for security
- Security Groups for each tier
- VPC with public, private, and database subnets

**Region:** us-east-1

Then estimate the monthly cost including:
- 10 TB data transfer in
- 10 TB data transfer out
- 10 million requests per month

Provide detailed cost breakdown and optimization recommendations including:
- Reserved Instance savings
- Savings Plans options
- Right-sizing opportunities
- Storage class optimization
```

## Customization Options

### Compute Options
- **t3.micro**: 2 vCPU, 1 GB RAM - Development/Testing
- **t3.small**: 2 vCPU, 2 GB RAM - Small applications
- **t3.medium**: 2 vCPU, 4 GB RAM - Medium applications
- **t3.large**: 2 vCPU, 8 GB RAM - Larger applications
- **m5.large**: 2 vCPU, 8 GB RAM - Production workloads
- **m5.xlarge**: 4 vCPU, 16 GB RAM - High-performance apps

### Database Options
- **MySQL**: Popular open-source RDBMS
- **PostgreSQL**: Advanced open-source RDBMS
- **MariaDB**: MySQL-compatible database
- **Oracle**: Enterprise database
- **SQL Server**: Microsoft database

### Cache Options
- **Redis**: In-memory data structure store
- **Memcached**: High-performance distributed memory cache

### Regions
- **us-east-1**: N. Virginia (lowest cost)
- **us-west-2**: Oregon
- **eu-west-1**: Ireland
- **ap-southeast-1**: Singapore
- **sa-east-1**: São Paulo

## Cost Optimization Checklist

After creating your architecture, consider:

- [ ] Use Reserved Instances for steady workloads (30-72% savings)
- [ ] Implement Auto Scaling to match demand
- [ ] Use S3 Lifecycle policies for old data
- [ ] Enable S3 Intelligent-Tiering
- [ ] Use VPC Endpoints for AWS services
- [ ] Implement CloudFront for static content
- [ ] Right-size instances based on monitoring
- [ ] Use Spot Instances for fault-tolerant workloads
- [ ] Enable RDS automated backups with appropriate retention
- [ ] Use Multi-AZ only for production environments
- [ ] Implement proper tagging for cost allocation
- [ ] Set up AWS Budgets and alerts

## Next Steps

1. Generate the architecture diagram
2. Review the cost estimate
3. Identify optimization opportunities
4. Adjust specifications as needed
5. Document assumptions and requirements
6. Share with stakeholders
7. Implement using Infrastructure as Code (Terraform/CloudFormation)

---

**Ready to build your three-tier application? Use this template and customize as needed!**
