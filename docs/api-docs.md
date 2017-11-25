## Classes

<dl>
<dt><a href="#AmqpSugarLib">AmqpSugarLib</a></dt>
<dd><p>Sugar methods to work with amqplib.</p>
</dd>
</dl>

## Typedefs

<dl>
<dt><a href="#rabbitConnectionDef">rabbitConnectionDef</a> : <code>string</code></dt>
<dd><p>RabbitMQ Server definition.</p>
</dd>
<dt><a href="#retry_behavior">retry_behavior</a> : <code>object</code></dt>
<dd><p>Retry behavior in case RabbitMQ is not available.
The goal is to try connecting to RabbitMQ as defined with retry_behavior.</p>
</dd>
</dl>

<a name="AmqpSugarLib"></a>

## AmqpSugarLib
Sugar methods to work with amqplib.

**Kind**: global class  

* [AmqpSugarLib](#AmqpSugarLib)
    * [.publishMessage(opts)](#AmqpSugarLib+publishMessage) ⇒ <code>Promise</code>
    * [.subscribeMessage(opts)](#AmqpSugarLib+subscribeMessage)
    * [.connect()](#AmqpSugarLib+connect) ⇒ <code>Promise</code>

<a name="AmqpSugarLib+publishMessage"></a>

### amqpSugarLib.publishMessage(opts) ⇒ <code>Promise</code>
Post a message to RabbitMq.

**Kind**: instance method of [<code>AmqpSugarLib</code>](#AmqpSugarLib)  

| Param | Type | Description |
| --- | --- | --- |
| opts | <code>object</code> | Configuration to use to publish a message. |
| opts.server | <code>string</code> | RabbitMQ server. If a string is passed, it's just the URI. |
| opts.exchange | <code>object</code> | Information about the exchange. |
| opts.exchange.type | <code>string</code> | 'topic', 'direct' |
| opts.exchange.name | <code>string</code> | Name of the exchange. |
| opts.key | <code>string</code> | Key to publish the message. |
| opts.payload | <code>object</code> | The message to post. |
| opts.options | <code>Object</code> | Options to publish. |
| [opts.correlationId] | <code>string</code> | RabbitMQ's correlationId. |
| [opts.retry_behavior] | [<code>retry_behavior</code>](#retry_behavior) | Retry behavior. |

<a name="AmqpSugarLib+subscribeMessage"></a>

### amqpSugarLib.subscribeMessage(opts)
Subscribe to a message on RabbitMQ.

**Kind**: instance method of [<code>AmqpSugarLib</code>](#AmqpSugarLib)  
**Access**: public  

| Param | Type | Description |
| --- | --- | --- |
| opts | <code>object</code> | Configuration object for subscribing to messages. |
| opts.server | <code>string</code> | URI of the server. |
| opts.exchange | <code>object</code> | The exchange to connect to. |
| opts.exchange.type | <code>string</code> | Type of the exchange, e.g. 'topic'. |
| opts.exchange.name | <code>string</code> | Name of the exchange. |
| opts.key | <code>string</code> | The routing key to use. |
| opts.queue | <code>object</code> | The queue to bind to |
| opts.queue.name | <code>string</code> |  |

<a name="AmqpSugarLib+connect"></a>

### amqpSugarLib.connect() ⇒ <code>Promise</code>
Connect to RabbitMQ.

Very similar to amqp.connect, but with the big difference, that if the connection
fails, the operation will retry as defined in [retry_behavior](#retry_behavior)

**Kind**: instance method of [<code>AmqpSugarLib</code>](#AmqpSugarLib)  
**Returns**: <code>Promise</code> - - Returns the promise as defined for amqplib.connect  

| Param | Type | Description |
| --- | --- | --- |
| opts.server | [<code>rabbitConnectionDef</code>](#rabbitConnectionDef) | Connection information for the server. |
| opts.retry_behavior | [<code>retry_behavior</code>](#retry_behavior) | Retry behavior for establishing the connection. |

<a name="rabbitConnectionDef"></a>

## rabbitConnectionDef : <code>string</code>
RabbitMQ Server definition.

**Kind**: global typedef  
<a name="retry_behavior"></a>

## retry_behavior : <code>object</code>
Retry behavior in case RabbitMQ is not available.
The goal is to try connecting to RabbitMQ as defined with retry_behavior.

**Kind**: global typedef  
**Read only**: true  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| retries | <code>number</code> | The maximum amount of times to retry the operation. Defaults to 10. |
| enabled | <code>boolean</code> | Whether retry is enabled at all or not (defaults to true); setting to false is equal to keeping [retry_behavior](#retry_behavior) empty. |
| interval | <code>number</code> | Interval in ms. |
| times | <code>number</code> | Amount of times the given operation should be retried. |
| attempts | <code>number</code> | Readonly, current amount of attempts. |

