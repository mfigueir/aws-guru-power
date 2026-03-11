#!/usr/bin/env node

/**
 * AWS Draw.io Diagram Generator MCP Server
 * 
 * Generates editable draw.io XML diagrams with AWS architecture icons.
 * No external dependencies required — pure XML generation using
 * the mxgraph.aws4 shape library built into draw.io/diagrams.net.
 */

const { Server } = require("@modelcontextprotocol/sdk/server/index.js");
const { StdioServerTransport } = require("@modelcontextprotocol/sdk/server/stdio.js");
const {
  CallToolRequestSchema,
  ListToolsRequestSchema,
} = require("@modelcontextprotocol/sdk/types.js");

// ─── AWS Service → draw.io shape mapping ───────────────────────────────────

const AWS_SHAPES = {
  // Compute
  ec2:            { shape: "mxgraph.aws4.resourceIcon;resIcon=mxgraph.aws4.ec2",            fill: "#ED7100", category: "compute" },
  lambda:         { shape: "mxgraph.aws4.resourceIcon;resIcon=mxgraph.aws4.lambda",          fill: "#ED7100", category: "compute" },
  ecs:            { shape: "mxgraph.aws4.resourceIcon;resIcon=mxgraph.aws4.ecs",             fill: "#ED7100", category: "compute" },
  eks:            { shape: "mxgraph.aws4.resourceIcon;resIcon=mxgraph.aws4.eks",             fill: "#ED7100", category: "compute" },
  fargate:        { shape: "mxgraph.aws4.resourceIcon;resIcon=mxgraph.aws4.fargate",         fill: "#ED7100", category: "compute" },
  batch:          { shape: "mxgraph.aws4.resourceIcon;resIcon=mxgraph.aws4.batch",           fill: "#ED7100", category: "compute" },
  lightsail:      { shape: "mxgraph.aws4.resourceIcon;resIcon=mxgraph.aws4.lightsail",       fill: "#ED7100", category: "compute" },
  auto_scaling:   { shape: "mxgraph.aws4.resourceIcon;resIcon=mxgraph.aws4.auto_scaling2",   fill: "#ED7100", category: "compute" },
  step_functions: { shape: "mxgraph.aws4.resourceIcon;resIcon=mxgraph.aws4.step_functions",  fill: "#ED7100", category: "compute" },

  // Storage
  s3:              { shape: "mxgraph.aws4.resourceIcon;resIcon=mxgraph.aws4.s3",              fill: "#3F8624", category: "storage" },
  ebs:             { shape: "mxgraph.aws4.resourceIcon;resIcon=mxgraph.aws4.elastic_block_store", fill: "#3F8624", category: "storage" },
  efs:             { shape: "mxgraph.aws4.resourceIcon;resIcon=mxgraph.aws4.elastic_file_system",  fill: "#3F8624", category: "storage" },
  fsx:             { shape: "mxgraph.aws4.resourceIcon;resIcon=mxgraph.aws4.fsx",             fill: "#3F8624", category: "storage" },
  backup:          { shape: "mxgraph.aws4.resourceIcon;resIcon=mxgraph.aws4.backup",          fill: "#3F8624", category: "storage" },
  storage_gateway: { shape: "mxgraph.aws4.resourceIcon;resIcon=mxgraph.aws4.storage_gateway", fill: "#3F8624", category: "storage" },

  // Database
  rds:          { shape: "mxgraph.aws4.resourceIcon;resIcon=mxgraph.aws4.rds",          fill: "#C925D1", category: "database" },
  aurora:       { shape: "mxgraph.aws4.resourceIcon;resIcon=mxgraph.aws4.aurora",       fill: "#C925D1", category: "database" },
  dynamodb:     { shape: "mxgraph.aws4.resourceIcon;resIcon=mxgraph.aws4.dynamodb",     fill: "#C925D1", category: "database" },
  elasticache:  { shape: "mxgraph.aws4.resourceIcon;resIcon=mxgraph.aws4.elasticache",  fill: "#C925D1", category: "database" },
  neptune:      { shape: "mxgraph.aws4.resourceIcon;resIcon=mxgraph.aws4.neptune",      fill: "#C925D1", category: "database" },
  redshift:     { shape: "mxgraph.aws4.resourceIcon;resIcon=mxgraph.aws4.redshift",     fill: "#C925D1", category: "database" },
  timestream:   { shape: "mxgraph.aws4.resourceIcon;resIcon=mxgraph.aws4.timestream",   fill: "#C925D1", category: "database" },
  documentdb:   { shape: "mxgraph.aws4.resourceIcon;resIcon=mxgraph.aws4.documentdb_with_mongodb_compatibility", fill: "#C925D1", category: "database" },

  // Networking
  vpc:             { shape: "mxgraph.aws4.resourceIcon;resIcon=mxgraph.aws4.vpc",              fill: "#8C4FFF", category: "networking" },
  cloudfront:      { shape: "mxgraph.aws4.resourceIcon;resIcon=mxgraph.aws4.cloudfront",       fill: "#8C4FFF", category: "networking" },
  route53:         { shape: "mxgraph.aws4.resourceIcon;resIcon=mxgraph.aws4.route_53",         fill: "#8C4FFF", category: "networking" },
  api_gateway:     { shape: "mxgraph.aws4.resourceIcon;resIcon=mxgraph.aws4.api_gateway",      fill: "#E7157B", category: "networking" },
  alb:             { shape: "mxgraph.aws4.resourceIcon;resIcon=mxgraph.aws4.elastic_load_balancing", fill: "#8C4FFF", category: "networking" },
  nlb:             { shape: "mxgraph.aws4.resourceIcon;resIcon=mxgraph.aws4.network_load_balancer",  fill: "#8C4FFF", category: "networking" },
  direct_connect:  { shape: "mxgraph.aws4.resourceIcon;resIcon=mxgraph.aws4.direct_connect",   fill: "#8C4FFF", category: "networking" },
  transit_gateway: { shape: "mxgraph.aws4.resourceIcon;resIcon=mxgraph.aws4.transit_gateway",   fill: "#8C4FFF", category: "networking" },
  nat_gateway:     { shape: "mxgraph.aws4.resourceIcon;resIcon=mxgraph.aws4.vpc_nat_gateway",   fill: "#8C4FFF", category: "networking" },
  global_accelerator: { shape: "mxgraph.aws4.resourceIcon;resIcon=mxgraph.aws4.global_accelerator", fill: "#8C4FFF", category: "networking" },
  appsync:         { shape: "mxgraph.aws4.resourceIcon;resIcon=mxgraph.aws4.appsync",          fill: "#E7157B", category: "networking" },

  // Security
  iam:              { shape: "mxgraph.aws4.resourceIcon;resIcon=mxgraph.aws4.iam",              fill: "#DD344C", category: "security" },
  cognito:          { shape: "mxgraph.aws4.resourceIcon;resIcon=mxgraph.aws4.cognito",          fill: "#DD344C", category: "security" },
  kms:              { shape: "mxgraph.aws4.resourceIcon;resIcon=mxgraph.aws4.key_management_service", fill: "#DD344C", category: "security" },
  waf:              { shape: "mxgraph.aws4.resourceIcon;resIcon=mxgraph.aws4.waf",              fill: "#DD344C", category: "security" },
  shield:           { shape: "mxgraph.aws4.resourceIcon;resIcon=mxgraph.aws4.shield_advanced",  fill: "#DD344C", category: "security" },
  guardduty:        { shape: "mxgraph.aws4.resourceIcon;resIcon=mxgraph.aws4.guardduty",        fill: "#DD344C", category: "security" },
  secrets_manager:  { shape: "mxgraph.aws4.resourceIcon;resIcon=mxgraph.aws4.secrets_manager",  fill: "#DD344C", category: "security" },
  certificate_manager: { shape: "mxgraph.aws4.resourceIcon;resIcon=mxgraph.aws4.certificate_manager", fill: "#DD344C", category: "security" },

  // Analytics
  kinesis:     { shape: "mxgraph.aws4.resourceIcon;resIcon=mxgraph.aws4.kinesis",     fill: "#8C4FFF", category: "analytics" },
  athena:      { shape: "mxgraph.aws4.resourceIcon;resIcon=mxgraph.aws4.athena",      fill: "#8C4FFF", category: "analytics" },
  glue:        { shape: "mxgraph.aws4.resourceIcon;resIcon=mxgraph.aws4.glue",        fill: "#8C4FFF", category: "analytics" },
  emr:         { shape: "mxgraph.aws4.resourceIcon;resIcon=mxgraph.aws4.emr",         fill: "#8C4FFF", category: "analytics" },
  quicksight:  { shape: "mxgraph.aws4.resourceIcon;resIcon=mxgraph.aws4.quicksight",  fill: "#8C4FFF", category: "analytics" },
  msk:         { shape: "mxgraph.aws4.resourceIcon;resIcon=mxgraph.aws4.managed_streaming_for_kafka", fill: "#8C4FFF", category: "analytics" },
  opensearch:  { shape: "mxgraph.aws4.resourceIcon;resIcon=mxgraph.aws4.opensearch_service", fill: "#8C4FFF", category: "analytics" },
  lake_formation: { shape: "mxgraph.aws4.resourceIcon;resIcon=mxgraph.aws4.lake_formation", fill: "#8C4FFF", category: "analytics" },

  // AI/ML
  sagemaker:   { shape: "mxgraph.aws4.resourceIcon;resIcon=mxgraph.aws4.sagemaker",   fill: "#01A88D", category: "ai_ml" },
  bedrock:     { shape: "mxgraph.aws4.resourceIcon;resIcon=mxgraph.aws4.sagemaker",   fill: "#01A88D", category: "ai_ml" },
  comprehend:  { shape: "mxgraph.aws4.resourceIcon;resIcon=mxgraph.aws4.comprehend",  fill: "#01A88D", category: "ai_ml" },
  rekognition: { shape: "mxgraph.aws4.resourceIcon;resIcon=mxgraph.aws4.rekognition", fill: "#01A88D", category: "ai_ml" },
  lex:         { shape: "mxgraph.aws4.resourceIcon;resIcon=mxgraph.aws4.lex",         fill: "#01A88D", category: "ai_ml" },
  polly:       { shape: "mxgraph.aws4.resourceIcon;resIcon=mxgraph.aws4.polly",       fill: "#01A88D", category: "ai_ml" },
  textract:    { shape: "mxgraph.aws4.resourceIcon;resIcon=mxgraph.aws4.textract",    fill: "#01A88D", category: "ai_ml" },
  kendra:      { shape: "mxgraph.aws4.resourceIcon;resIcon=mxgraph.aws4.kendra",      fill: "#01A88D", category: "ai_ml" },
  translate:   { shape: "mxgraph.aws4.resourceIcon;resIcon=mxgraph.aws4.translate",   fill: "#01A88D", category: "ai_ml" },

  // Management
  cloudwatch:       { shape: "mxgraph.aws4.resourceIcon;resIcon=mxgraph.aws4.cloudwatch",       fill: "#E7157B", category: "management" },
  cloudformation:   { shape: "mxgraph.aws4.resourceIcon;resIcon=mxgraph.aws4.cloudformation",   fill: "#E7157B", category: "management" },
  systems_manager:  { shape: "mxgraph.aws4.resourceIcon;resIcon=mxgraph.aws4.systems_manager",  fill: "#E7157B", category: "management" },
  config:           { shape: "mxgraph.aws4.resourceIcon;resIcon=mxgraph.aws4.config",           fill: "#E7157B", category: "management" },
  cloudtrail:       { shape: "mxgraph.aws4.resourceIcon;resIcon=mxgraph.aws4.cloudtrail",       fill: "#E7157B", category: "management" },
  eventbridge:      { shape: "mxgraph.aws4.resourceIcon;resIcon=mxgraph.aws4.eventbridge",      fill: "#E7157B", category: "management" },

  // Application Integration
  sqs:  { shape: "mxgraph.aws4.resourceIcon;resIcon=mxgraph.aws4.sqs",  fill: "#E7157B", category: "integration" },
  sns:  { shape: "mxgraph.aws4.resourceIcon;resIcon=mxgraph.aws4.sns",  fill: "#E7157B", category: "integration" },

  // IoT
  iot_core:      { shape: "mxgraph.aws4.resourceIcon;resIcon=mxgraph.aws4.iot_core",      fill: "#1B660F", category: "iot" },
  iot_greengrass: { shape: "mxgraph.aws4.resourceIcon;resIcon=mxgraph.aws4.iot_greengrass", fill: "#1B660F", category: "iot" },
  iot_sensor:    { shape: "mxgraph.aws4.resourceIcon;resIcon=mxgraph.aws4.iot_sensor",    fill: "#5A6C86", category: "iot" },

  // General
  users:              { shape: "mxgraph.aws4.resourceIcon;resIcon=mxgraph.aws4.users",              fill: "#232F3E", category: "general" },
  client:             { shape: "mxgraph.aws4.resourceIcon;resIcon=mxgraph.aws4.client",             fill: "#232F3E", category: "general" },
  traditional_server: { shape: "mxgraph.aws4.resourceIcon;resIcon=mxgraph.aws4.traditional_server", fill: "#5A6C86", category: "general" },
  documents:          { shape: "mxgraph.aws4.resourceIcon;resIcon=mxgraph.aws4.documents",          fill: "#5A6C86", category: "general" },
  generic_database:   { shape: "mxgraph.aws4.resourceIcon;resIcon=mxgraph.aws4.generic_database",   fill: "#5A6C86", category: "general" },
};

// ─── Cluster color presets ─────────────────────────────────────────────────

const CLUSTER_COLORS = {
  agentcore:  "#FF8000",
  bedrock:    "#01A88D",
  vpc:        "#8C4FFF",
  security:   "#DD344C",
  data:       "#C925D1",
  storage:    "#3F8624",
  compute:    "#ED7100",
  networking: "#8C4FFF",
  onpremise:  "#5A6C86",
  analytics:  "#8C4FFF",
  output:     "#8C4FFF",
  default:    "#147EBA",
};

// ─── XML helpers ───────────────────────────────────────────────────────────

function escapeXml(str) {
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

function buildNodeStyle(service) {
  const def = AWS_SHAPES[service] || AWS_SHAPES.generic_database;
  return `outlineConnect=0;fontColor=#232F3E;gradientColor=none;fillColor=${def.fill};strokeColor=none;dashed=0;verticalLabelPosition=bottom;verticalAlign=top;align=center;html=1;fontSize=10;aspect=fixed;pointerEvents=1;shape=${def.shape};`;
}

function buildClusterStyle(color) {
  return `points=[[0,0],[0.25,0],[0.5,0],[0.75,0],[1,0],[1,0.25],[1,0.5],[1,0.75],[1,1],[0.75,1],[0.5,1],[0.25,1],[0,1],[0,0.75],[0,0.5],[0,0.25]];outlineConnect=0;gradientColor=none;html=1;whiteSpace=wrap;fontSize=12;fontStyle=1;shape=mxgraph.aws4.group;grIcon=mxgraph.aws4.group_region;strokeColor=${color};fillColor=none;verticalAlign=top;align=left;spacingLeft=30;dashed=1;`;
}

function buildEdgeStyle(edge) {
  const parts = [];
  if (edge.dashed) parts.push("dashed=1");
  if (edge.color) parts.push(`strokeColor=${edge.color}`);
  if (edge.strokeWidth) parts.push(`strokeWidth=${edge.strokeWidth}`);
  if (edge.label) parts.push(`edgeLabel=${escapeXml(edge.label)}`);
  return parts.join(";");
}

// ─── Diagram generator ────────────────────────────────────────────────────

function generateDrawio({ title, subtitle, nodes, clusters, edges, width, height }) {
  const w = width || 1600;
  const h = height || 900;
  let cellId = 10;
  const nextId = () => `c${cellId++}`;
  const idMap = {};

  let cells = "";

  // Title
  if (title) {
    const titleText = subtitle ? `${escapeXml(title)}&#xa;${escapeXml(subtitle)}` : escapeXml(title);
    cells += `        <mxCell id="title" value="${titleText}" style="text;html=1;align=center;verticalAlign=middle;resizable=0;points=[];autosize=1;strokeColor=none;fillColor=none;fontSize=16;fontStyle=1;" vertex="1" parent="1">\n`;
    cells += `          <mxGeometry x="${Math.round(w * 0.25)}" y="20" width="${Math.round(w * 0.5)}" height="50" as="geometry"/>\n`;
    cells += `        </mxCell>\n`;
  }

  // Clusters
  if (clusters && clusters.length > 0) {
    for (const cluster of clusters) {
      const cid = cluster.id || nextId();
      idMap[cluster.id || cluster.label] = cid;
      const color = CLUSTER_COLORS[cluster.type] || cluster.color || CLUSTER_COLORS.default;
      const style = buildClusterStyle(color);
      cells += `        <mxCell id="${cid}" value="${escapeXml(cluster.label)}" style="${style}" vertex="1" parent="1">\n`;
      cells += `          <mxGeometry x="${cluster.x}" y="${cluster.y}" width="${cluster.width}" height="${cluster.height}" as="geometry"/>\n`;
      cells += `        </mxCell>\n`;
    }
  }

  // Nodes
  if (nodes && nodes.length > 0) {
    for (const node of nodes) {
      const nid = node.id || nextId();
      idMap[node.id || node.label] = nid;
      const style = buildNodeStyle(node.service || "generic_database");
      const size = node.size || 50;
      const fontStyle = node.bold ? "fontStyle=1;" : "";
      const fontSize = node.fontSize ? `fontSize=${node.fontSize};` : "";
      const fullStyle = style + fontStyle + fontSize;
      cells += `        <mxCell id="${nid}" value="${escapeXml(node.label)}" style="${fullStyle}" vertex="1" parent="1">\n`;
      cells += `          <mxGeometry x="${node.x}" y="${node.y}" width="${size}" height="${size}" as="geometry"/>\n`;
      cells += `        </mxCell>\n`;
    }
  }

  // Edges
  if (edges && edges.length > 0) {
    for (const edge of edges) {
      const eid = nextId();
      const sourceId = idMap[edge.source] || edge.source;
      const targetId = idMap[edge.target] || edge.target;
      const style = buildEdgeStyle(edge);
      const styleAttr = style ? ` style="${style}"` : "";
      cells += `        <mxCell id="${eid}" edge="1" source="${sourceId}" target="${targetId}" parent="1"${styleAttr}>\n`;
      cells += `          <mxGeometry relative="1" as="geometry"/>\n`;
      cells += `        </mxCell>\n`;
    }
  }

  const diagramName = title ? escapeXml(title.substring(0, 60)) : "AWS Architecture";

  return `<mxfile host="app.diagrams.net" modified="${new Date().toISOString().split("T")[0]}" agent="aws-guru-power" version="24.0.0" type="device">
  <diagram id="d1" name="${diagramName}">
    <mxGraphModel dx="${w}" dy="${h}" grid="1" gridSize="10" guides="1" tooltips="1" connect="1" arrows="1" fold="1" page="1" pageScale="1" pageWidth="${w}" pageHeight="${h}" math="0" shadow="0">
      <root>
        <mxCell id="0"/>
        <mxCell id="1" parent="0"/>
${cells}      </root>
    </mxGraphModel>
  </diagram>
</mxfile>`;
}

// ─── MCP Server setup ──────────────────────────────────────────────────────

const server = new Server(
  { name: "drawio-generator", version: "1.0.0" },
  { capabilities: { tools: {} } }
);

server.setRequestHandler(ListToolsRequestSchema, async () => ({
  tools: [
    {
      name: "generate_drawio",
      description:
        "Generate an editable draw.io XML diagram with AWS architecture icons. " +
        "Returns the XML content that can be saved as a .drawio file and opened in diagrams.net. " +
        "No external dependencies required.",
      inputSchema: {
        type: "object",
        properties: {
          title: { type: "string", description: "Diagram title" },
          subtitle: { type: "string", description: "Subtitle (e.g. service details, token volume, cost)" },
          width: { type: "number", description: "Canvas width in pixels (default 1600)" },
          height: { type: "number", description: "Canvas height in pixels (default 900)" },
          nodes: {
            type: "array",
            description: "Array of AWS service nodes to place on the diagram",
            items: {
              type: "object",
              properties: {
                id:       { type: "string", description: "Unique node ID (used in edges)" },
                service:  { type: "string", description: "AWS service key from the shape catalog (e.g. 'lambda', 's3', 'bedrock')" },
                label:    { type: "string", description: "Display label (supports \\n for line breaks)" },
                x:        { type: "number", description: "X position on canvas" },
                y:        { type: "number", description: "Y position on canvas" },
                size:     { type: "number", description: "Icon size in pixels (default 50)" },
                bold:     { type: "boolean", description: "Bold label text" },
                fontSize: { type: "number", description: "Font size override" },
              },
              required: ["id", "service", "label", "x", "y"],
            },
          },
          clusters: {
            type: "array",
            description: "Array of grouping rectangles (clusters) for organizing components",
            items: {
              type: "object",
              properties: {
                id:     { type: "string", description: "Unique cluster ID" },
                label:  { type: "string", description: "Cluster label" },
                type:   { type: "string", description: "Preset type: agentcore, bedrock, vpc, security, data, storage, compute, networking, onpremise, analytics, output" },
                color:  { type: "string", description: "Custom border color hex (overrides type)" },
                x:      { type: "number", description: "X position" },
                y:      { type: "number", description: "Y position" },
                width:  { type: "number", description: "Width" },
                height: { type: "number", description: "Height" },
              },
              required: ["id", "label", "x", "y", "width", "height"],
            },
          },
          edges: {
            type: "array",
            description: "Array of connections between nodes",
            items: {
              type: "object",
              properties: {
                source:      { type: "string", description: "Source node ID" },
                target:      { type: "string", description: "Target node ID" },
                dashed:      { type: "boolean", description: "Dashed line style" },
                color:       { type: "string", description: "Line color hex" },
                strokeWidth: { type: "number", description: "Line thickness" },
                label:       { type: "string", description: "Edge label text" },
              },
              required: ["source", "target"],
            },
          },
        },
        required: ["title", "nodes"],
      },
    },
    {
      name: "list_aws4_shapes",
      description:
        "List all available AWS service shape keys that can be used in the 'service' field of generate_drawio nodes. " +
        "Optionally filter by category.",
      inputSchema: {
        type: "object",
        properties: {
          category: {
            type: "string",
            description: "Filter by category: compute, storage, database, networking, security, analytics, ai_ml, management, integration, iot, general. Omit for all.",
          },
        },
      },
    },
  ],
}));

server.setRequestHandler(CallToolRequestSchema, async (request) => {
  const { name, arguments: args } = request.params;

  if (name === "generate_drawio") {
    try {
      const xml = generateDrawio(args);
      return {
        content: [{ type: "text", text: xml }],
      };
    } catch (err) {
      return {
        content: [{ type: "text", text: `Error generating draw.io diagram: ${err.message}` }],
        isError: true,
      };
    }
  }

  if (name === "list_aws4_shapes") {
    const category = args?.category;
    const filtered = Object.entries(AWS_SHAPES)
      .filter(([, v]) => !category || v.category === category)
      .map(([key, v]) => ({ key, category: v.category, fill: v.fill }));

    const categories = [...new Set(Object.values(AWS_SHAPES).map((v) => v.category))].sort();

    return {
      content: [
        {
          type: "text",
          text: JSON.stringify(
            {
              total: filtered.length,
              categories,
              shapes: filtered,
            },
            null,
            2
          ),
        },
      ],
    };
  }

  return {
    content: [{ type: "text", text: `Unknown tool: ${name}` }],
    isError: true,
  };
});

// ─── Start ─────────────────────────────────────────────────────────────────

async function main() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
  console.error("drawio-generator MCP server running on stdio");
}

main().catch((err) => {
  console.error("Fatal error:", err);
  process.exit(1);
});
